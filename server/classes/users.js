class Users {

  constructor() {
    this.users = []; // Users list
  }

  /** addUser()
   * Add new user to user list
   * @param {String} id
   * @param {String} name
   * @returns {Array}
   */
  addUser(id, name) {
    const user = {id, name}
    this.users.push(user)

    return this.users
  }

  /** getUser()
   * Get user by id from users list
   * @param {String} id
   * @returns { Object | null}
   */
  getUser(id) {

    const user = this.users.find(user => user.id === id);

    return user ? user : null

  }

  /** getUsers()
   * Get users list
   * @returns {Array}
   */
  getUsers() {
    return this.users
  }

}

module.exports = {
  Users
}