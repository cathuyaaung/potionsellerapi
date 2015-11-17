
var express = require('express');
var router = express.Router({mergeParams: true});
var categoryRouter = require('./categoryRouter');
var itemRouter = require('./itemRouter');
var supplierRouter = require('./supplierRouter');

// Default Start
router.use(function(req, res, next){
	// Allow CORS
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
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


router.use('/item/:item', itemRouter);


router.use('/supplier', supplierRouter);










router.post('/upload', function(req, res){
	var path = require('path'),
    fs = require('fs');
	var tempPath = req.files.file.path;
	var targetPath = path.resolve('./uploadFiles/' + req.files.file.name);
	fs.rename(tempPath, targetPath, function(err) {
		if (err) { res.send(err); } else {
			console.log("Upload completed!");	
		}
	});
});


// 404
router.use(function(req, res, next){
	res.status(404).send('API not found');
	next();
});

module.exports = router;