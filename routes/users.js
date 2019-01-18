const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Teacher = require('../models/teacher');

//carica registrazione
router.get('/register', function(req, res){
  res.render('register');
});

//registrazione
router.post('/register', function(req, res){
  //definizioni variabili in cui tenere i dati del form
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;
  //manda la sanitizzazione e validazione dell'input
  let errors = req.validationErrors();

  //se ci sono errori ricarica la pagina corrente
  if (errors) {
    console.log("error");
    res.render('register');
  }
  else { //se non ci sono errori si procede ad aggiungere l'account al db
    let newTeacher = new Teacher({
      name:name,
      email:email,
      username:username,
      password:password,
    });

    //hash della password
    bcrypt.genSalt(10, function(err, salt){ 
      bcrypt.hash(newTeacher.password, salt, function(err, hash){
        if(err){res.render('register');}
        newTeacher.password = hash;
        newTeacher.save(function(err){ //salvataggio nel db
          if(err){console.log(err); return;} 
        else {
            res.redirect('/users/login'); //registrazione completata --> va alla login
          }
        });
      });
    });
  }
});

//carina login
router.get('/login', function(req, res){
  res.render('login'); 
});

//login
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/', //al successo va alla home
    failureRedirect:'/users/login', //errore -> ricarica la stessa pagina
    failureFlash: true
  })(req, res, next);
});


// logout
router.get('/logout', function(req, res){
  req.logout();
  console.log('logged out');
  res.redirect('/');
});

module.exports = router;
