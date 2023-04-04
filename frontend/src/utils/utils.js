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
