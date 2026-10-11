import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

export async function list(req, res) {
  const rows = await User.find()
  res.json(rows)
}

export async function getOne(req, res) {
  const row = await User.findById(req.params.id)
  if (!row) {
    res.status(404).json({ message: 'Not found.' })
    return
  }
  res.json(row)
}

export async function create(req, res) {
  const name = (req.body.name || '').trim()
  const email = (req.body.email || '').trim().toLowerCase()
  const password = req.body.password || ''
  if (!name || !email || password.length < 6) {
    res.status(400).json({ message: 'Name, email, and a password of 6 or more characters are required.' })
    return
  }
  const existing = await User.findOne({ email })
  if (existing) {
    res.status(409).json({ message: 'That email is already registered.' })
    return
  }
  const hashed = await bcrypt.hash(password, 10)
  const row = await User.create({
    name,
    email,
    password: hashed,
    role: 'user',
    created: new Date(),
    updated: new Date()
  })
  res.status(201).json(row)
}

export async function update(req, res) {
  const patch = { ...req.body, updated: new Date() }
  if (patch.password) {
    patch.password = await bcrypt.hash(patch.password, 10)
  }
  delete patch.role
  const row = await User.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true })
  if (!row) {
    res.status(404).json({ message: 'Not found.' })
    return
  }
  res.json(row)
}

export async function remove(req, res) {
  const row = await User.findByIdAndDelete(req.params.id)
  if (!row) {
    res.status(404).json({ message: 'Not found.' })
    return
  }
  res.json({ message: 'Removed.' })
}

export async function removeAll(req, res) {
  await User.deleteMany({ role: { $ne: 'admin' } })
  res.json({ message: 'Removed non-admin users.' })
}
