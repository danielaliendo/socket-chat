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
  addUser(id, name, room) {
    const user = {id, name, room}
    this.users.push(user)
    return this.getRoomUsers(room)
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

  getRoomUsers(room) {
    return this.users.filter(user => user.room === room)
  }

  /** deleteUser()
   * Delete user by id
   * @param id
   * @returns {Object|null}
   */
  deleteUser(id) {
    const deletedUser = this.getUser(id);
    this.users = this.users.filter(user => user.id !== id)
    return deletedUser
  }

}

module.exports = Users