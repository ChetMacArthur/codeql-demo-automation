const express = require('express');
const crypto = require('crypto'); // We'll use this for a weak hash
const app = express();

app.get('/login', (req, res) => {
    let user = req.query.user;
    let pass = req.query.pass;

    // 1. Weak Cryptography (Our "Policy Violation")
    // The company policy says: "NEVER use MD5 for passwords"
    let hash = crypto.createHash('md5').update(pass).digest('hex');

    // 2. Open Redirect (A standard CodeQL bug)
    let target = req.query.url;
    res.redirect(target); 

    console.log(`User ${user} logged in with hash ${hash}`);
    res.send("Logged in");
});

app.listen(8080);
