import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './server/config/db.js'
import { seedAdmin } from './server/config/seed.js'
import { makeCrud } from './server/controllers/crud.js'
import * as userController from './server/controllers/user.controller.js'
import * as authController from './server/controllers/auth.controller.js'
import { resourceRouter } from './server/routes/resource.routes.js'
import Contact from './server/models/contact.model.js'
import Project from './server/models/project.model.js'
import Qualification from './server/models/qualification.model.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.type('html').send('<p>Portfolio API. Vadim Gubin. Server is running.</p>')
})

app.use('/api/contacts', resourceRouter(makeCrud(Contact), true))
app.use('/api/projects', resourceRouter(makeCrud(Project), false))
app.use('/api/qualifications', resourceRouter(makeCrud(Qualification), false))
app.use('/api/users', resourceRouter(userController, true))

app.post('/auth/signin', authController.signin)
app.get('/auth/signout', authController.signout)

export { app }

if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.PORT || 5000)
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'lab-secret'
  }
  await connectDB(process.env.MONGO_URI)
  await seedAdmin()
  app.listen(port, () => {
    console.log('Portfolio API listening on port ' + port)
  })
}
