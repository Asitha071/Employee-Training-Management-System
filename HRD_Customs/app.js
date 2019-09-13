const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database ,{useNewUrlParser: true});
let db = mongoose.connection;

//Check connection
db.once('open', function(){
  console.log('Connected to MongoDB....');
});

// Check for db errors
db.on('error', function(err){
  console.log(err);
});

// Init App
const app = express();

//Bring in Models
let Foreign = require('./models/foreign_detail');

//Bring in Models
let Local = require('./models/local_detail');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware
// Parse application/ form- urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
//Parse Application/Jason
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,

}));

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req,res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
     var namespace = param.split('.')
  , root = namespace.shift()
  , formParam = root;

  while(namespace.length){
    formParam += '['+ namespace.shift() + ']';
  }
  return {
    param : formParam,
    msg :msg,
    value: value
  };
}
}));

//Passport config
require('./config/passport')(passport);
//passport middleware
 app.use(passport.initialize());
 app.use(passport.session());


 app.get('*', function(req,res, next){
   res.locals.user = req.user || null;
   next();
 });

//Home Route
app.get('/', function(req, res){
  res.render('home', {
    title: 'Home'
  });
});

//Route file_name
let foreign_details = require('./routes/foreign_details');
let users = require('./routes/users');
let local_details = require('./routes/local_details');
let reim = require('./routes/reim');
app.use('/foreign_details',foreign_details);
app.use('/users',users);
app.use('/local_details',local_details);
app.use('/reim',reim);

//show Local detail Route
/*app.get('/local_details/show', function(req, res){
  Local.find({}, function(err, local_details){
    if(err){
      console.log(err);
    } else {
      res.render('localhome', {
        title:'Local',
        local_details: local_details
      });
    }
  });
});

//Add Local detail Route
app.get('/local_details/add', function(req, res){
  res.render('local', {
    title: 'Add Local Detail'
  });
});
*/

//example pug Route
app.get('users/example', function(req, res){
  res.render('example', {
    title: 'About'
  });
});

//About Route
app.get('router/about_details', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

//Contact Route
app.get('/contact_details', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

//Graph details route
app.get('/graph_details', function(req, res){
  res.render('graph', {
    title: 'Graphs'
  });
});

//reimbursement detail route
app.get('/reimbursement_details', function(req, res){
  res.render('reimbursement', {
    title: 'Reimbursement'
  });
});


// start server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});
