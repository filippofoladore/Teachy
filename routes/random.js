const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

//home di random
router.get('/', function (req, res){
    res.render('random');
})

//prende in input id della classe e restituisce il documento della classe selezionata
router.post('/getClass/:id', function(req, res){
    Teacher.findOne(
        {_id: req.user.id,  "classes._id": req.params.id},
        {"classes.$":1}, 
        (err,result) => {
          if (err) {console.log("errore");}
          else {res.json(result);}
        }
      );
})

module.exports = router;