const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

//home di about
router.get('/', function (req, res){
    res.render('about');
})

//eliminazione dell'account
router.post('/deleteAccount/:id', function(req, res){
    Teacher.findOneAndDelete(
        {_id: req.params.id},
        (err, doc) => {
            if (err) {console.log(err)}
            else {res.json(doc)}
        }
    );
})

module.exports = router;