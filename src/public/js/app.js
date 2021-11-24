// const messageList = document.querySelector("ul");
// const messageForm  = document.querySelector("#message");
// const nickForm  = document.querySelector("#nick");

// //서버와 연결
// const socket = new WebSocket(`ws://${window.location.host}`);

// //JSON을 이용하여 Object형식을 String으로 변환한다.
// function makeMessage (type, payload) {
//     const msg = {type, payload};
//     return JSON.stringify(msg);
// };


// //서버와 연결이 됬을때
// socket.addEventListener("open", () => {
//     console.log("Connected to Server");
// });

// //서버와 연결중일때
// socket.addEventListener("message", (message) => {
//     const li = document.createElement("li");
//     li.innerText = message.data;
//     messageList.append(li);
// });

// //서버와 연결이 끊겼을때
// socket.addEventListener("close", () => {
//     console.log("Disconnected to Server");
// });

// //10초 뒤에 back-end로 메시지를 전달
// //setTimeout(() => {
// //    socket.send("hello from the browser!");
// //}, 10000);


// function handleSubmit (event) {
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     const li = document.createElement("li");
//     li.innerText = `You: ${input.value}`;
//     messageList.append(li);
//     input.value = "";
// };
 
// function handleNickSubmit (event) {
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(makeMessage("nickname", input.value));
//     input.value = "";
// };

// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);

const socket = io(); 

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage (message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
};

function handleMessageSubmit (event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = "";
};

function handleNicknameSubmit (event) {
    event.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nickname", input.value)
}

function handleRoomSubmit (event) {
    event.preventDefault();
    const input = room.querySelector("input");

    //어떤 event든 보낼수 있다, javascript object를 보낼수있다
    socket.emit("enter_room", input.value, () => {
        welcome.hidden = true;
        room.hidden = false;
        const h3 = room.querySelector("h3");
        h3.innerText = `Room ${roomName}`;
        const msgForm = room.querySelector("#msg");
        const nameForm = room.querySelector("#name");
        msgForm.addEventListener("submit", handleMessageSubmit);
        nameForm.addEventListener("submit", handleNicknameSubmit);
    });
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
    addMessage(`${user} joined!`);
});

socket.on("bye", (left) => {
    addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);