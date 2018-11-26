const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

router.post('/add/:id', function(req,res){
  var c = req.body.cNum;
  var s = req.body.cSez;
  var addClass = c+s;
  var data = {cName: addClass};
  console.log('c da aggiungere: '+ addClass);
  console.log("aggiungo in id: "+ req.params.id);
 
  Teacher.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {classes:data}},
    {upsert:true},
    function(err, succ){
      if (err) {res.send('Qualcosa è andato storto, riprova')}
      else {
        console.log("ok, aggiunto "+addClass + " all'id " + req.params.id);
        res.redirect('back');
    }}
  );
})

router.get('/class/:id')

router.get('/', function(req,res){
  res.render('manage');
});

module.exports = router;