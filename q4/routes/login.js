const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

// Function to check if username and password are valid
const isValidCredentials = (username, password) => {
    // Read the login file
    const loginFilePath = path.join(__dirname, 'login.txt');
    const loginData = fs.readFileSync(loginFilePath, 'utf8').trim().split('\n');

    // Check if any line in the file matches the provided username-password pair
    for (const line of loginData) {
        const [storedUsername, storedPassword] = line.split(':');
        if (storedUsername === username && storedPassword === password) {
            return true;
        }
    }
    return false;
};

router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Check if username and password are valid
  if (isValidCredentials(username, password)) {
    req.session.username = username;
    res.redirect('/donate');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});
router.get('/logout', (req, res) => {
  // Destroy the session
  
  req.session = null;
  res.render('index', {message: 'You have been logged out'});
});

module.exports = router;