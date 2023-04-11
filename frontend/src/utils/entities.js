export class LoginDTO {
  constructor (email, password) {
    this.email = email
    this.password = password
  }
}

export class RegisterDTO {
  constructor (name, email, password) {
    this.name = name
    this.email = email
    this.password = password
  }
}

export class UpdateGameDTO {
  constructor (questions, gameState) {
    this.questions = questions
    this.name = gameState.name
    this.thumbnail = gameState.thumbnail
  }
}
