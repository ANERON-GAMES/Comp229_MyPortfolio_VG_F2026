export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export function authHeader() {
  const token = localStorage.getItem('token') || ''
  if (!token) {
    return {}
  }
  return { Authorization: 'Bearer ' + token }
}

export async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeader(),
    ...(options.headers || {})
  }
  const response = await fetch(API_URL + path, { ...options, headers })
  const text = await response.text()
  let data = text
  try {
    data = JSON.parse(text)
  } catch {
    data = text
  }
  if (!response.ok) {
    const message = data && data.message ? data.message : 'Request failed.'
    throw new Error(message)
  }
  return data
}
