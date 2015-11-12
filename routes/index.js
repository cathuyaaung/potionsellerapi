
var express = require('express');
var router = express.Router();
var categoryRouter = require('./categoryRouter');


// Default Start
router.use(function(req, res, next){
	next();
});

// HOME
router.get('/', function(req, res){
	res.json({ message: 'welcome to potionseller API ' + req.headers['x-subdomain']});
});


// /category routes
router.use('/category', categoryRouter);



// 404
router.use(function(req, res, next){
	res.json({ message: 'API not found'});
	next();
});

module.exports = router;