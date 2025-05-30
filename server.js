const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "accountBuilder.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "profileBuilder.html"));
});

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
    const htmlMessage = `
<div class="message">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/TestScreen_square.svg" class="profile" />
  <div class="message-content">
    <div class="message-header">
      <b class="username">${data[1]}</b>
      <span class="timestamp" data-date="${data[3]}">${data[2]}</span>
    </div>
    <p class="text">${data[0]}</p>
  </div>
</div>\n`;
    fs.appendFile(
      path.join(__dirname, "public", "everymessageever.txt"),
      htmlMessage,
      (err) => {}
    );
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
