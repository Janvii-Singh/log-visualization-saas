const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const logFile = path.join(__dirname, 'logs', 'app.log');
fs.mkdirSync(path.dirname(logFile), { recursive: true });

function writeLog(logObj) {
  const logLine = JSON.stringify(logObj) + "\n";
  fs.appendFileSync(logFile, logLine);
  console.log(logLine);
}

// 🔄 Simulate a variety of logs every few seconds
function simulateLogs() {
  const levels = ["info", "warn", "error", "debug"];
  const actions = ["user_login", "file_upload", "data_export", "api_call", "payment"];
  const users = ["u123", "u456", "u789"];
  const projects = ["projectA", "projectB", "projectC"];

  const log = {
    timestamp: new Date().toISOString(),
    level: levels[Math.floor(Math.random() * levels.length)],
    message: actions[Math.floor(Math.random() * actions.length)],
    userId: users[Math.floor(Math.random() * users.length)],
    projectId: projects[Math.floor(Math.random() * projects.length)],
    ip: `192.168.0.${Math.floor(Math.random() * 255)}`
  };

  writeLog(log);
}

// 🔁 Generate heartbeat + simulated logs
setInterval(() => {
  writeLog({
    level: "info",
    message: "Heartbeat from Node app",
    timestamp: new Date().toISOString()
  });

  simulateLogs();
}, 3000);

// 🧪 Sample endpoints to trigger manual logs
app.get('/', (req, res) => {
  writeLog({
    level: "info",
    message: "Root endpoint hit",
    timestamp: new Date().toISOString(),
    path: req.path
  });
  res.send('Hello from Node.js!');
});

app.get('/login', (req, res) => {
  writeLog({
    level: "info",
    message: "User login attempt",
    timestamp: new Date().toISOString(),
    userId: "u123",
    success: Math.random() > 0.2
  });
  res.send("Login simulated");
});

app.get('/error', (req, res) => {
  writeLog({
    level: "error",
    message: "Simulated application error",
    timestamp: new Date().toISOString(),
    errorCode: 500,
    path: req.path
  });
  res.status(500).send("Simulated error");
});

app.listen(port, () => {
  writeLog({
    level: "info",
    message: `App listening on port ${port}`,
    timestamp: new Date().toISOString()
  });
});
