
var express = require('express');
var router = express.Router({mergeParams: true});
var categoryRouter = require('./categoryRouter');
var itemRouter = require('./itemRouter');

// Default Start
router.use(function(req, res, next){
	next();
});

// HOME
router.get('/', function(req, res){
	res.json({ message: 'welcome to potionseller API ' + req.headers['x-subdomain']});
});


// /categories [GET, POST, PUT, DELETE]
// Categories route
router.use('/category', categoryRouter);

// /category/:categoryid/ [GET, POST, POST, DELETE]
// Items route
router.use('/category/:categoryid/item', itemRouter);




// 404
router.use(function(req, res, next){
	res.json({ message: 'API not found'});
	next();
});

module.exports = router;