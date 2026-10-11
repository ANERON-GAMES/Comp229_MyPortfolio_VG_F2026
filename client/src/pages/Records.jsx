import { useEffect, useState } from 'react'
import { api } from '../api.js'

const emptyProject = {
  title: '',
  firstname: 'Vadim',
  lastname: 'Gubin',
  email: 'anerongames@gmail.com',
  completion: '2026-10-11',
  description: ''
}

function Records() {
  const role = localStorage.getItem('role') || ''
  const [projects, setProjects] = useState([])
  const [qualifications, setQualifications] = useState([])
  const [form, setForm] = useState(emptyProject)
  const [error, setError] = useState('')

  async function load() {
    const projectRows = await api('/api/projects')
    const qualificationRows = await api('/api/qualifications')
    setProjects(projectRows)
    setQualifications(qualificationRows)
  }

  useEffect(() => {
    load().catch((err) => setError(err.message))
  }, [])

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await api('/api/projects', { method: 'POST', body: JSON.stringify(form) })
      setForm(emptyProject)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  async function removeProject(id) {
    setError('')
    try {
      await api('/api/projects/' + id, { method: 'DELETE' })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main>
      <h1 className="page-title">Records</h1>
      {error ? <p>{error}</p> : null}
      <h2>Projects</h2>
      <ul>
        {projects.map((row) => (
          <li key={row._id}>
            {row.title}. {row.description}
            {role === 'admin' ? (
              <button className="btn" type="button" onClick={() => removeProject(row._id)}>Delete</button>
            ) : null}
          </li>
        ))}
      </ul>
      <h2>Qualifications</h2>
      <ul>
        {qualifications.map((row) => (
          <li key={row._id}>{row.title}. {row.description}</li>
        ))}
      </ul>
      {role === 'admin' ? (
        <form onSubmit={onSubmit}>
          <h2>Add a project</h2>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={form.title} onChange={onChange} required />
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={onChange} required />
          <button className="btn" type="submit">Save</button>
        </form>
      ) : (
        <p>Sign in as admin to add or delete records.</p>
      )}
    </main>
  )
}

export default Records
