import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'

function Contact() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  })

  function onChange(e) {
    const field = e.target.name
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await api('/api/contacts', {
        method: 'POST',
        body: JSON.stringify({
          firstname: form.firstName,
          lastname: form.lastName,
          email: form.email,
          message: form.message
        })
      })
      sessionStorage.setItem('lastContact', JSON.stringify(form))
      navigate('/', { state: { contact: form } })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main>
      <h1 className="page-title">Contact</h1>
      <div className="contact-grid">
        <aside className="panel">
          <h2>Vadim Gubin</h2>
          <span className="muted">ANERON / Aneron Games</span>
          <p>Toronto, ON</p>
          <p style={{ marginTop: '0.8rem' }}>
            <a className="inline" href="mailto:anerongames@gmail.com">anerongames@gmail.com</a>
          </p>
          <p>
            <a className="inline" href="mailto:anerongamesdeveloper@gmail.com">anerongamesdeveloper@gmail.com</a>
          </p>
        </aside>

        <form onSubmit={onSubmit}>
          {error ? <p>{error}</p> : null}
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" value={form.firstName} onChange={onChange} required />

          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" value={form.lastName} onChange={onChange} required />

          <label htmlFor="contactNumber">Contact number</label>
          <input id="contactNumber" name="contactNumber" value={form.contactNumber} onChange={onChange} required />

          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={form.message} onChange={onChange} required />

          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </main>
  )
}

export default Contact
