const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

router.get('/', function (req, res){
    res.render('random')
})

router.post('/getClass/:id', function(req, res){
    Teacher.findOne(
        {_id: req.user.id,  "classes._id": req.params.id},
        {"classes.$":1}, 
        (err,result) => {
          if (err) {console.log("hey, un errore")}
          else {res.json(result);}
        }
      )
})

module.exports = router;