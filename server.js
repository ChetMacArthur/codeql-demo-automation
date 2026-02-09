const { execFile } = require('child_process'); // Use execFile instead of exec
const express = require('express');
const app = express();
const AWS_KEY = "AKIAIMNO7CQH6O5A6XYZ";
app.get('/run', (req, res) => {
    const userPath = req.query.path;

    // 1. VALIDATION: Only allow alphanumeric characters (no ; | & or spaces)
    if (!/^[a-z0-9]+$/i.test(userPath)) {
        return res.status(400).send("Invalid path format.");
    }

    // 2. SECURE EXECUTION: Use execFile with an arguments array.
    // This treats 'userPath' as a literal string, not a shell command.
    execFile('/bin/ls', ['-l', userPath], (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send("Error executing command.");
        }
        res.send(stdout);
    });
});

app.listen(3000);
