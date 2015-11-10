
// Express app
var express 	= require('express');
var app 		= express();

// Requires body-parser
var bodyParser = require('body-parser');


// Use body-parser
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set PORT
var port = process.env.PORT || 3100;



// Set ROUTES from router.js
var router = require('./router');
app.use('/', router);


app.listen(port);
console.log('server started on '+port);