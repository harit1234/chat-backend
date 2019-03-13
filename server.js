var express = require("express");
var app = express();
var http = require("http");
var mongoose = require("mongoose");
var server = http.createServer(app);
var bodyparser = require("body-parser");
var io = require("socket.io").listen(server);

var onTextHandler = require("./routes/chat/socket/onText");

var rooms = {};

// socket server listening
var chatSocket = io.of("/chatbox");

chatSocket.on("connection", async socket => {
  console.log("socket connected xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  socket.on("room", room => {
    socket.join(room);
    console.log(room);
    console.log(socket.id);
  });

  socket.on("text", async data => {
    console.log("text rec", data);
    await onTextHandler(data, chatSocket);
  });
});

server.listen(9000, async () => {
  console.log("server listening at 9000");
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// connect DB
mongoose.connect(
  "mongodb://harit:passw0rd@ds155845.mlab.com:55845/chatdb",
  { useNewUrlParser: true },
  err => {
    if (err) console.log("error", err);
    else console.log("database connected");
  }
);

app.use("*", (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    req.header("origin") ||
      req.header("x-forwarded-host") ||
      req.header("referer") ||
      req.header("host")
  );

  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//route handles
var tokenVerify = require("./routes/authenticate/handlers/tokenverify");

var authHandle = require("./routes/authenticate/index");
app.use("/auth", authHandle);

var chatHandle = require("./routes/chat/index");
// app.use("/chat", tokenVerify, chatHandle);
app.use("/chat", chatHandle);
