process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'lab-secret'

const { MongoMemoryServer } = await import('mongodb-memory-server')
const mongod = await MongoMemoryServer.create()
process.env.MONGO_URI = mongod.getUri('Portfolio')

const { connectDB } = await import('./config/db.js')
const { seedAdmin, ADMIN_EMAIL, ADMIN_PASSWORD } = await import('./config/seed.js')
const { app } = await import('../server.js')

await connectDB(process.env.MONGO_URI)
await seedAdmin()

const server = app.listen(0)
const base = 'http://127.0.0.1:' + server.address().port

async function call(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = 'Bearer ' + token
  }
  const response = await fetch(base + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })
  const text = await response.text()
  let data = text
  try {
    data = JSON.parse(text)
  } catch {
    data = text
  }
  console.log(method + ' ' + path + ' -> ' + response.status)
  console.log(typeof data === 'string' ? data : JSON.stringify(data))
  return { status: response.status, data }
}

const home = await call('GET', '/')
if (home.status !== 200) {
  throw new Error('Home page failed.')
}

const signin = await call('POST', '/auth/signin', {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD
})
const token = signin.data.token
if (!token || signin.data.role !== 'admin') {
  throw new Error('Admin sign in failed.')
}

const created = await call('POST', '/api/contacts', {
  firstname: 'Vadim',
  lastname: 'Gubin',
  email: 'anerongames@gmail.com',
  message: 'Hello from the contact form.'
})
const id = created.data._id
await call('GET', '/api/contacts')
await call('GET', '/api/contacts/' + id)

const userSign = await call('POST', '/api/users', {
  name: 'Sam Cole',
  email: 'sam@example.com',
  password: 'secret1'
})
const userToken = (await call('POST', '/auth/signin', {
  email: 'sam@example.com',
  password: 'secret1'
})).data.token
const blocked = await call('POST', '/api/projects', {
  title: 'Blocked',
  firstname: 'Sam',
  lastname: 'Cole',
  email: 'sam@example.com',
  completion: '2026-10-11',
  description: 'A user cannot add this.'
}, userToken)
if (blocked.status !== 403) {
  throw new Error('User write was not blocked.')
}

const project = await call('POST', '/api/projects', {
  title: 'Bloodrain',
  firstname: 'Vadim',
  lastname: 'Gubin',
  email: 'anerongames@gmail.com',
  completion: '2026-10-11',
  description: 'First-person prologue.'
}, token)
await call('PUT', '/api/projects/' + project.data._id, {
  description: 'First-person prologue with walk, jump, crawl, and dash.'
}, token)
await call('GET', '/api/qualifications')
await call('DELETE', '/api/contacts/' + id, null, token)
await call('GET', '/auth/signout')

if (!userSign.data._id) {
  throw new Error('Signup failed.')
}

console.log('API checks finished.')
server.close()
await mongod.stop()
process.exit(0)
