const express = require('express'); //routing
const path = require('path'); //per lavorare con directory e percorsi di file
const mongoose = require('mongoose'); //connesso a mongodb, comunica con db
const bodyParser = require('body-parser'); //legge il body e permette di usare req.body per estrarre informazioni e dati
const expressValidator = require('express-validator'); //validazione e sanitizzazione input nei form
const session = require('express-session'); //tiene la sessione attiva per non dover fare il login ad ogni pagina visitata, sicurezza dei cookie
const passport = require('passport'); //modulo per autenticazione
const config = require('./config/database'); //punta al file di configurazione del db (con nome, path ecc)
const favicon = require('serve-favicon'); //favicon della pagina
const flash = require('express-flash-messages'); //flash messaggi, serve con express-validator


mongoose.connect(config.database);  //connessione al db specificato nel file config/database
let db = mongoose.connection; //connessione a mongoose

//controlla connessione la prima volta e basta
db.once('open', function(){
    console.log('Connesso a MongoDB');
});

// controlla errori database
db.on('error', function(err){
    console.log(err);
});

//inizializza express per il routing
const app = express();

//importa modelli per usare lo schema
let Teacher = require('./models/teacher');

//carica view engine per la visualizzazione delle pagine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //view-engine usato dall'app, Embedded Java Script
app.use(flash()); //flash usato insieme a express-validator per visualizzare messaggi

//carica body parser per leggere i dati
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', '/img/favicon.ico'))); //favicon del sito


//setta la cartella public per i css/js/img
app.use(express.static(path.join(__dirname, 'public')));

// Express Session (copiato dalla documentazione, in fase di testing non servono segreti, in produzione sì!)
app.use(session({
    secret: 'segretoprova',
    resave: true, //forza la sessione ad essere salvata nella memoria di sessione
    saveUninitialized: true //forza una sessione non inizializata ad essere salvato nella memoria di sessione
  }));



// Express Validator Middleware, dalla documentazione!
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

// configurazione passport usato per autenticazione
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
let manage = require('./routes/manage');
let registro = require('./routes/registro');
let random = require('./routes/random');
let about = require('./routes/about');

//per ogni richiesta con /users /manage /registro ... reindirizza al file di route corrispondente
app.use('/users', users);
app.use('/manage', manage);
app.use('/registro', registro);
app.use('/random', random);
app.use('/about', about);

// Fa partire il server sulla porta 3000
app.listen(3000, function(){
  console.log('Porta 3000 in ascolto.');
});
  
