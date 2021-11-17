import express from "express";

const app = express();

//pug로 view engine 설정
app.set("view engine", "pug");

//express에 template가 어디 있는지 설정
app.set("views", __dirname + "/views");

//static 작업: 유저가 /public으로 가게 되면 __dirname + "/public"폴더를 보여주게 함
//public url을 생성해서 유저에게 파일을 공유
app.use("/public",express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

app.listen(3000, handleListen);  