const messageList = document.querySelector("ul");
const messageForm  = document.querySelector("form");

//서버와 연결
const socket = new WebSocket(`ws://${window.location.host}`);

//서버와 연결이 됬을때
socket.addEventListener("open", () => {
    console.log("Connected to Server");
});

//서버와 연결중일때
socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
});

//서버와 연결이 끊겼을때
socket.addEventListener("close", () => {
    console.log("Disconnected to Server");
});

//10초 뒤에 back-end로 메시지를 전달
//setTimeout(() => {
//    socket.send("hello from the browser!");
//}, 10000);


function handleSubmit (event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);