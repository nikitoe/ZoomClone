//서버와 연결
const socket = new WebSocket(`ws://${window.location.host}`);

//서버와 연결이 됬을때
socket.addEventListener("open", () => {
    console.log("Connected to Server");
});

//서버와 연결중일때
socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data, "from the Server");
});

//서버와 연결이 끊겼을때
socket.addEventListener("close", () => {
    console.log("Disconnected to Server");
});

setTimeout(() => {
    socket.send("hello from the browser!");
}, 10000);