const express = require('express');
const router = express.Router();
const path = require('path'); // Import the path modul
const fs = require('fs');

router.get('/', (req,res)=>{
    res.render('createacc', {title: "account creation"})
});

router.post('/create-account', (req, res) => {
    // Log request body to console
    const { username, password } = req.body;
    console.log(req.body); 
    // Validate username format (letters and digits only)
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).send('Invalid username format. Username must contain letters and digits only.');
    }

    // Validate password format (at least 4 characters long, letters and digits, at least one letter and one digit)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send('Invalid password format. Password must be at least 4 characters long and contain at least one letter and one digit.');
    }
    const loginFilePath = path.join(__dirname, 'login.txt'); // Correct file path to login.t
    const loginData = fs.readFileSync(loginFilePath, 'utf8').trim().split('\n');
    const existingUsernames = loginData.map(line => line.split(':')[0]);
    if (existingUsernames.includes(username)) {
        return res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
    }
    const newData = `${username}:${password}\n`;
    fs.appendFileSync(loginFilePath, newData);
    res.status(200).json({ message: 'Account successfully created. You can now log in.' });
});
module.exports = router;
