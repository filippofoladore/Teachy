const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

router.get('/', function (req, res){
    res.render('about')
})

router.post('/deleteAccount/:id', function(req, res){
    res.send("HELLO")
    console.log(req.user.id)
})

module.exports = router;