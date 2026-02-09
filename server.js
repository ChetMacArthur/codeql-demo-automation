const exec = require('child_process').exec;
const express = require('express');
const app = express();

app.get('/run', (req, res) => {
  // DANGEROUS: User input flows directly into a shell command
  exec("ls " + req.query.path); 
  res.send("Command triggered.");
});

app.listen(3000);
