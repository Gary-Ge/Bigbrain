export function validEmail (email) {
  if (email == null || email === '' || !email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    return false
  }
  return true
}

export function validNotNull (value) {
  if (value == null || value === '') {
    return false
  }
  return true
}

export function saveToken (token) {
  localStorage.setItem('token', token)
}

export function removeToken () {
  localStorage.removeItem('token')
}

export const HOST = 'http://localhost:5005'
export const LOGIN_URL = '/admin/auth/login'
export const REGISTER_URL = '/admin/auth/register'
export const HEADER = { 'Content-Type': 'application/json' }
