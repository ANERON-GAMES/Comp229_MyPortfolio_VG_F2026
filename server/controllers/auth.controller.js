import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export async function signin(req, res) {
  const email = (req.body.email || '').trim().toLowerCase()
  const password = req.body.password || ''
  const user = await User.findOne({ email })
  if (!user) {
    res.status(401).json({ message: 'Sign in failed.' })
    return
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    res.status(401).json({ message: 'Sign in failed.' })
    return
  }
  const token = jwt.sign(
    { id: String(user._id), role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )
  res.json({ token, name: user.name, role: user.role, email: user.email })
}

export function signout(req, res) {
  res.json({ message: 'Signed out.' })
}
