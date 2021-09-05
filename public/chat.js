const socket = io.connect("http://localhost:5000");

const usernameInput = document.querySelector("#username")
const changeUsernameBtn = document.querySelector("#send_username")

const messageInput = document.querySelector("#message")
const sendMessageBtn = document.querySelector("#send_message")

const chatroom = document.querySelector("#chatroom")


changeUsernameBtn.addEventListener("click", () => {
    username = usernameInput.value
    socket.emit("change_username", (username))
})

sendMessageBtn.addEventListener("click", () => {
    message = messageInput.value;
    socket.emit("new_message", {message})
    messageInput.value = ""
})

socket.on("new_message", data => {
    chatroom.innerHTML += `<p class="message"> ${data.username}: ${data.message} </p>`
})