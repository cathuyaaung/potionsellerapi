
// Express app
var express 	= require('express');
var app 		= express();
var morgan 		= require('morgan')
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var methodOverride = require('method-override');

var config 		= require('./config');
configs 		= config();
console.log(configs);

// Middleware
// -----------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(methodOverride('X-HTTP-Method-Override'))


app.set('superSecret', 'how now brown cow');


// Uploads
// -------
app.use('/uploads',  express.static(__dirname + '/uploads'));


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


// The NodeJS app may crash if an error occurs. 
// Crash is prevented and an error log is printed in the console.
process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start app
// ---------
app.listen(port);
console.log('Magic happening at: ' + port);

module.exports = app;