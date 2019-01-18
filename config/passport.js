const LocalStrategy = require('passport-local').Strategy;
const Teacher = require('../models/teacher');
const config = require('../config/database');
const bcrypt = require('bcryptjs'); //hash delle password

module.exports = function(passport){
    passport.use(new LocalStrategy(function(username, password, done){ //localstrategy = come si deve comportare durante le operazioni di login
        //match dell'username
        let query = {username:username};
        Teacher.findOne(query, function(err,user){
            if (err) throw err;
            if (!user){
                return done(null, false, {message: 'No user found'});
            }
            //match della password
            bcrypt.compare(password, user.password, function(err, corrisponde){
                if (err) throw err;
                if (corrisponde){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id); //userid salvato nella sessione, si salva solo l'id che poi potrà essere usato dovunque con req.user
      });
    
      passport.deserializeUser(function(id, done) { //si ritrova l'utente salvato (id)
        Teacher.findById(id, function(err, user) {
          done(err, user); //oggetot user nella richiesta req.user
        });
      });
}