export class User {
  username: string
  fullName: string
  roles: string[]

  constructor(
    username: string = '',
    fullName: string = '',
    roles: string[] = []) {
    this.username = username
    this.fullName = fullName
    this.roles = roles
  }
}
