import config from '../config.json'

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

export function getToken () {
  return localStorage.getItem('token')
}

export function getAuthHeader () {
  return { 'Content-Type': 'application/json', Authorization: getToken() }
}

export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    if (!valid) reject(new Error('Provided file is not a png, jpg or jpeg image.'))
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export function checkValidQuiz (questions) {
  if (questions.length === 0) return false
  for (const question of questions) {
    if (question.title === '') return false
    if (question.a === '' || question.b === '') return false
    if (question.correct.length === 0) return false
    if (question.d !== '' && question.c === '') return false
    if (question.e !== '' && (question.c === '' || question.d === '')) return false
    if (question.f !== '' && (question.c === '' || question.d === '' || question.e === '')) return false
  }
  return true
}

export const HOST = `http://localhost:${config.BACKEND_PORT}`
export const LOGIN_URL = '/admin/auth/login'
export const REGISTER_URL = '/admin/auth/register'
export const LOG_OUT_URL = '/admin/auth/logout'
export const CREATE_GAME_URL = '/admin/quiz/new'
export const GET_GAME_URL = '/admin/quiz'
export const JOIN_GAME_URL = '/play/join'
export const PLAY_GAME_URL = '/play'
export const GET_SESSION_URL = '/admin/session'
export const HEADER = { 'Content-Type': 'application/json' }
