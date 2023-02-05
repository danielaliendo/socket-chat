const createMessage = (name, message, isAdmin = false) => ({
  name,
  message,
  date: new Date().getTime(),
  isAdmin
})

module.exports = {
  createMessage
}