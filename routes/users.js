const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let Teacher = require('../models/teacher');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Proccess
router.post('/register', function(req, res){
  //definizioni variabili in cui tenere i dati del form
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;

  //da fare, flash dei messaggi
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    console.log("error");
    res.render('register');
  }
  else {
    let newTeacher = new Teacher({
      name:name,
      email:email,
      username:username,
      password:password,
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newTeacher.password, salt, function(err, hash){
        if(err){res.render('register');}
        newTeacher.password = hash;
        newTeacher.save(function(err){
          if(err){console.log(err); return;} 
        else {
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/login', function(req, res){
  res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
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
