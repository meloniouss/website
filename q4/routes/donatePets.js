const express = require('express');
const router = express.Router();
const path = require('path'); // Import the path modul
const fs = require('fs');
let counter = 0;
const isAuthenticated = (req, res, next) => {
    if (req.session.username) {
      next();
    } else {
      res.redirect('/login');
    }
  };

router.get('/', isAuthenticated ,(req,res)=>{
    res.render('donate')
});
router.post('/', isAuthenticated, (req, res) => {
  
    const { petInfo } = req.body;
    const username = req.session.username = username;
    console.log(req.body);
    // Process and save pet information
    res.redirect('/give-pet');
  });
  
  router.post('/submit-pet', (req, res) => {
    counter++;
    const formData = req.body;
    console.log(formData);
    // Write form data to a text file
    const username = req.session.username;
    const filePath = 'petinfo.txt';
    const data = `${counter}:${username}:${formData.antype}:${formData.catBreed || ''}:${formData.dogBreed || ''}:${formData.age}:${formData.gender}:${formData.otherDogs ? 'yes' : 'no'}:${formData.otherCats ? 'yes' : 'no'}:${formData.smallChildren ? 'yes' : 'no'}:${formData.comments || ''}:${formData.ownerfirstName} ${formData.ownerlastName}:${formData.ownerEmail}\n`;
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Form data submitted successfully' });
      }
    });
  });
module.exports = router;