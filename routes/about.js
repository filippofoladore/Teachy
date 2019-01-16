const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

router.get('/', function (req, res){
    res.render('about')
})

module.exports = router;