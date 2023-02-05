const params = new URLSearchParams(window.location.search);

// html references
const lstUsers = $('#lstUsers');
const frmSend = $('#frmSend');
const txtMessage = $('#txtMessage');
const lstChats = $('#lstChats');

const name = params.get('name');
const room = params.get('room');

const renderUsers = (users) => {

  let html = `
    <li>
        <a href="javascript:void(0)" className="active"> Chat de <span> ${params.get('room')}</span></a> 
    </li>
  `;

  users.forEach(user => {
    html += `
    <li>
      <a data-id="${user.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg"
      alt="user-img" class="img-circle"> <span>${user.name} <small
      class="text-success">online</small></span></a>
    </li>
  `
  })

  lstUsers.html(html)
};

const renderMessage = (message, reverse) => {

  const date = new Date(message.date)

  let html

  if (reverse) {
    html = `
      <li class="animated fadeIn reverse">
      <div class="chat-content">
      <h5>${message.name}</h5>
      <div class="box bg-light-inverse">${message.message}</div>
      </div>
      <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user"/>
      </div>
      <div class="chat-time">${`${date.getHours()}:${date.getMinutes()}`}</div>
      </li>
    `
  } else if (message.isAdmin) {
    html = `
    <li style="display: flex; justify-content: space-between;">
    <p style="margin: 0;">${message.message}</p>
    <div class="chat-time">${`${date.getHours()}:${date.getMinutes()}`}</div>
    </li>
  `
  } else {
    html = `
    <li>
    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user"/>
    </div>
    <div class="chat-content">
    <h5>${message.name}</h5>
    <div class="box bg-light-info">${message.message}</div>
    </div>
    <div class="chat-time">${`${date.getHours()}:${date.getMinutes()}`}</div>
    </li>
  `
  }

  lstChats.append(html);
  scrollBottom()

}

function scrollBottom() {

  // selectors
  var newMessage = lstChats.children('li:last-child');

  // heights
  var clientHeight = lstChats.prop('clientHeight');
  var scrollTop = lstChats.prop('scrollTop');
  var scrollHeight = lstChats.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    lstChats.scrollTop(scrollHeight);
  }
}


// Listeners
lstUsers.on('click', 'a', () => {
  const id = $(this).data('id');
  if (!id) return
})

frmSend.on('submit', (e) => {
  e.preventDefault();

  if (txtMessage.val().trim().length === 0) return

  socket.emit('createMessage', {
    message: txtMessage.val()
  }, function (message) {
    renderMessage(message, true)
    txtMessage.val('').focus();
  });

})