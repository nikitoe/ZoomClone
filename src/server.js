import express from "express";
//import WebSocket from "ws";
import SocketIO from "socket.io";
import http from "http";
import { SocketAddress } from "net";

const app = express();

//pug로 view engine 설정
app.set("view engine", "pug");

//express에 template가 어디 있는지 설정
app.set("views", __dirname + "/views");

//static 작업: 유저가 /public으로 가게 되면 __dirname + "/public"폴더를 보여주게 함
//public url을 생성해서 유저에게 파일을 공유
app.use("/public",express.static(__dirname + "/public"));

//home.pug를 render해주는 route handler를 만듬
app.get("/", (req, res) => res.render("home"));

//유저가 어떤 url로 이동하든지 홈으로 돌려보내기
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

//app.listen(3000, handleListen);  

//나의 http 서버를 만듬
const server = http.createServer(app);

//const wss = new WebSocket.Server({server});

const swServer = SocketIO(server);

swServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event:${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
    });
});

//여러개의 브라우저와 연결시키기위해 fake database를 생성
// const sockets = [];

// //연결된 브라우저,socket에 evnet listener을 등록
// wss.on("connection", (socket) =>{
//     sockets.push(socket);
//     socket["nickname"] = "Anon";
//     console.log("Connected to Browser");
//     socket.on("close", () => console.log("Disconnected from the Browser"));

//     //특정 socket에서 message를 주고 받는다
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);

//         switch (message.type) {
//             case "new_message":
//                 sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.paly}`));
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         };
//     });
// });

server.listen(3000, handleListen);

