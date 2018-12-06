const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

router.post('/add/:id', function(req,res){
  var c = req.body.cNum;
  var s = req.body.cSez;
  var addClass = c+s;
  var data = {cName: addClass};
  //console.log('c da aggiungere: '+ addClass);
  //console.log("aggiungo in id: "+ req.params.id);
 
  Teacher.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {classes:data}},
    {upsert:true},
    function(err, succ){
      if (err) {res.send('Qualcosa è andato storto, riprova')}
      else {
       //console.log("ok, aggiunto "+addClass + " all'id " + req.params.id);
        res.redirect('back');
    }}
  );
})

router.post('/class/:id', function(req,res){
    Teacher.findOne(
      {"classes._id": req.params.id},
      'classes',
      function (err,doc){
        if (err) {
          res.send('qualcosa è andato storto');
        } else {
          // res.send(doc);
          //console.log(doc);

          // console.log(JSON.stringify(sub));
        }
      }
    )
});

router.post('/addStudent/:id', function(req,res){
  var id = req.params.id; 
  var nome = req.body.name; 
  var cognome = req.body.lname; 
  var sesso = req.body.gender;
  var classId = req.body.classid;
  var data = {name: nome, lname : cognome, gender : sesso};
  Teacher.findOneAndUpdate(
    {_id: id, "classes._id": classId},
    {$push: {'classes.$.student': data}},
    {projection: "classes.student.$", sort: {lname: 1 }},
    (err,result) => {
      if (err) {console.log("omegaerrore"); console.log(err)}
      else {
        res.json(result);}
    }
  )
  
});

router.post('/classes/:id', function(req,res){
  Teacher.findOne(
    {_id: req.user.id,  "classes._id": req.params.id},
    {"classes.$":1}, 
    (err,result) => {
      if (err) {console.log("hey, un errore")}
      else {res.json(result);}
    }
  )
 
});



router.get('/', function(req,res){
  res.render('manage');
});

module.exports = router;