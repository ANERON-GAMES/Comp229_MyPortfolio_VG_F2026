import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

export const ADMIN_EMAIL = 'vgubin@my.centennialcollege.ca'
export const ADMIN_PASSWORD = 'PortfolioAdmin1'

export async function seedAdmin() {
  const existing = await User.findOne({ email: ADMIN_EMAIL })
  if (existing) {
    return
  }
  const password = await bcrypt.hash(ADMIN_PASSWORD, 10)
  await User.create({
    name: 'Vadim Gubin',
    email: ADMIN_EMAIL,
    password,
    role: 'admin'
  })
  console.log('Admin user stored: ' + ADMIN_EMAIL)
}
