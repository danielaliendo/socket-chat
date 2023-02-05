class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name) {
    const user = { id, name }
    this.users.push(user)

    return this.users
  }

}

module.exports = {
  Users
}