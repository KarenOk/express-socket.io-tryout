const socket = io.connect("http://localhost:5000");

const usernameInput = document.querySelector("#username")
const changeUsernameBtn = document.querySelector("#send_username")

const messageInput = document.querySelector("#message")
const sendMessageBtn = document.querySelector("#send_message")

const chatroom = document.querySelector("#chatroom")
const feedback = document.querySelector("#feedback")

// Client Event Listeners

document.addEventListener("mousemove", () => {
    socket.emit("stop_typing")
})

changeUsernameBtn.addEventListener("click", () => {
    username = usernameInput.value
    socket.emit("change_username", {username})
})

sendMessageBtn.addEventListener("click", () => {
    message = messageInput.value;
    socket.emit("new_message", {message})
    messageInput.value = ""
})

messageInput.addEventListener("keypress", () => {
    socket.emit("start_typing")
})

// Server Event Listeners


socket.on("new_message", data => {
    chatroom.innerHTML += `<p class="message"> ${data.username}: ${data.message} </p>`
})

socket.on("start_typing", data => {
    feedback.innerHTML= `<p> <i> ${data.username} is typing a message... </i> </p>`
})

socket.on("stop_typing", () => {
    console.log("stopped")
    feedback.innerHTML = ""
})