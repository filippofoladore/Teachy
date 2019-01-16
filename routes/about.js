const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

router.get('/', function (req, res){
    res.render('about')
})

router.post('/deleteAccount/:id', function(req, res){
    Teacher.findOneAndDelete(
        {_id: req.params.id},
        (err, doc) => {
            if (err) {console.log(err)}
            else {res.json(doc)}
        }
    )
})

module.exports = router;