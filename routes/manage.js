const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher'); 

//aggiunge  una classe, classe/sezione da input form
router.post('/add/:id', function(req,res){
  var c = req.body.cNum; //classe
  var s = req.body.cSez; //sezione
  var addClass = c+s; 
  var data = {cName: addClass};
  //console.log('c da aggiungere: '+ addClass);
  //console.log("aggiungo in id: "+ req.params.id);
  Teacher.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {classes:data}},
    {upsert:true}, //se non esiste aggiunge
    function(err, succ){
      if (err) {res.send('Qualcosa è andato storto, riprova')}
      else {
       //console.log("ok, aggiunto "+addClass + " all'id " + req.params.id);
        res.redirect('back');
    }}
  );
})

//sembra un duplicato di /classes/:id(?)
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

//aggiunge studente
router.post('/addStudent/:id', function(req,res){
  var id = req.params.id; 
  var nome = req.body.name; 
  var cognome = req.body.lname; 
  var sesso = req.body.gender;
  var classId = req.body.classid; //passato da ajax
  var data = {name: nome, lname : cognome, gender : sesso};
  Teacher.findOneAndUpdate(
    {_id: id, "classes._id": classId},
    {$push: {'classes.$.student': data}}, //push aggiunge all'array students lo studente
    {projection: "classes.student.$", sort: {lname: 1 }}, //proiezione su classi.studente, filtra
    (err,result) => {
      if (err) {console.log("Errore!"); console.log(err);}
      else {
        res.json(result);}
    }
  )
  
});

//restituisce info classe complete di quella filtrata dall'id inviato
router.post('/classes/:id', function(req,res){
  Teacher.findOne(
    {_id: req.user.id,  "classes._id": req.params.id},
    {"classes.$":1}, 
    (err,result) => {
      if (err) {console.log("Errore")}
      else {res.json(result);}
    }
  );
});

//elimina classe, riceve id classe, user noto da sessione (express session)
router.post('/deleteClass/:id', function(req,res){
  console.log("user id "+ req.user.id);
  console.log("class id "+ req.params.id); 
  Teacher.findByIdAndUpdate(
    {_id: req.user.id},
    {$pull:{classes:{_id: req.params.id}}}, //pull toglie dall'array classes la classe
    {new: true}, //restituisce il documento post-modifica
    function (err, result) {
      if (err) {
        console.log("errore deleting");
        console.log(err)
      } else {
        console.log("ok, deleted");
        res.json(result);
      }
    }
    );
})

//elimina studente, riceve id studente, classe passato da ajax, user noto da sessione (express session)
router.post('/deleteStudent/:id', function(req,res){
  Teacher.findOneAndUpdate(
    {"_id": req.user.id, "classes._id": req.body.classid},
    {"$pull": {'classes.$.student': {"_id": req.params.id}}}, //pull toglie dall'array students lo studente
    {new:true}, //restituisce il documento post-modifica
    (err,result) => {
      if (err) {console.log("errore eliminazione"); console.log(err)}
      else {
        res.json(result);}
    }
  );
})

//home di manage
router.get('/', function(req,res){
  res.render('manage');
});

module.exports = router;