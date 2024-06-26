const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const username = prompt("Please enter a username: ", "");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    console.log(msg);
    let usr_msg = `${username}: ${msg}`;
    const item = document.createElement('li');
    item.textContent = usr_msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});