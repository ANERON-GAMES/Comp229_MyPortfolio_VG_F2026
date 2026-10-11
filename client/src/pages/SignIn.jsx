import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'

function SignIn() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await api('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(form)
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      localStorage.setItem('name', data.name)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main>
      <h1 className="page-title">Sign in</h1>
      <form onSubmit={onSubmit}>
        {error ? <p>{error}</p> : null}
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={onChange} required />
        <button className="btn" type="submit">Sign in</button>
      </form>
    </main>
  )
}

export default SignIn
