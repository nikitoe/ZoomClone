import express from "express";
import WebSocket from "ws";
import http from "http";

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

const wss = new WebSocket.Server({server});

function handleConnection(socket) {
    console.log(socket);
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);