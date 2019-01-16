const express = require('express'); 
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const favicon = require('serve-favicon');
const flash = require('express-flash-messages')


mongoose.connect(config.database);
let db = mongoose.connection;

//controlla connessione la prima volta e basta
db.once('open', function(){
    console.log('Connesso a MongoDB');
});

// controlla errori database
db.on('error', function(err){
    console.log(err);
});

//inizializza express
const app = express();

//importa modelli
let Teacher = require('./models/teacher');

//carica view engine per la visualizzazione delle pagine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash())

//carica body parser per leggere i dati
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', '/img/favicon.ico')));


//setta la cartella public per i css/js/img
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));



// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// Home Route
app.get('/', function(req, res){
    res.render('index');
});



// File di route
let users = require('./routes/users');
let manage = require('./routes/manage')
let registro = require('./routes/registro')
let random = require('./routes/random')
let about = require('./routes/about')
//per ogni richiesta con /users /manage /registro ... reindirizza al file di route users.js 
app.use('/users', users);
app.use('/manage', manage);
app.use('/registro', registro)
app.use('/random', random)
app.use('/about', about)

// Fa partire il server sulla porta 3000
app.listen(3000, function(){
  console.log('Porta 3000 in ascolto.');
});
  
