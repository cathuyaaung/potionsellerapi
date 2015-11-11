
// Express app
var express 	= require('express');
var app 		= express();
var morgan 		= require('morgan')
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');

var config 		= require('./config');
configs 		= config();
console.log(configs);

// Middleware
// -----------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))

// DB
// --
var dbstring = 'mongodb://'+configs.dbhost+':'+configs.dbport+'/'+configs.dbname;
console.log('Connecting to db: '+dbstring);
mongoose.connect(dbstring);
console.log('db connected');

// Setup
// -----
var port = config().port;

// Routes
// ------
// Set ROUTES from router.js
var router = require('./routes');
app.use('/', router);

// Start app
// ---------
app.listen(port);
console.log('Magic happening at: ' + port);