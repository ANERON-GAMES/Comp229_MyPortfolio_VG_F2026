import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'

function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await api('/api/users', {
        method: 'POST',
        body: JSON.stringify(form)
      })
      navigate('/signin')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main>
      <h1 className="page-title">Sign up</h1>
      <form onSubmit={onSubmit}>
        {error ? <p>{error}</p> : null}
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={onChange} required />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={onChange} required />
        <button className="btn" type="submit">Create account</button>
      </form>
    </main>
  )
}

export default SignUp
