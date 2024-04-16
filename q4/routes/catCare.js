const express = require('express');
const router = express.Router();
router.get('/', (req,res)=>{
    res.render('catcare', {title: "cat care"})
});
module.exports = router;