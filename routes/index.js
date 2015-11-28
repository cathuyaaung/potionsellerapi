
var express = require('express');
var router = express.Router({mergeParams: true});
var jwt = require('jsonwebtoken');

var categoryRouter 		= require('./categoryRouter');
var itemRouter 			= require('./itemRouter');

var supplierRouter 		= require('./supplierRouter');
var customerRouter 		= require('./customerRouter');

var purchaseOrderRouter 		= require('./purchaseOrderRouter');
var purchaseOrderItemRouter 	= require('./purchaseOrderItemRouter');
var purchaseOrderPaymentRouter 	= require('./purchaseOrderPaymentRouter');

var saleOrderRouter 		= require('./saleOrderRouter');
var saleOrderItemRouter 	= require('./saleOrderItemRouter');
var saleOrderPaymentRouter 	= require('./saleOrderPaymentRouter');

var registerRouter 	= require('./registerRouter');
var loginRouter 	= require('./loginRouter');
var userRouter 	= require('./userRouter');



var whitelist = {
	'http://localhost:3333': true,
	'http://www.lawkanet.com': true,
	'http://lawkanet.com': true
};

// Default Start
router.use(function(req, res, next){
	if(whitelist[req.headers.origin]){
		// Allow CORS
		res.header('Access-Control-Allow-Origin', '*');
	  	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth, x-access-token');
	  	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');		
	}
	
	next();
});

// HOME
router.get('/', function(req, res){
	res.json({ message: 'welcome to potionseller API ' + req.headers['x-subdomain']});
});


router.use('/register', registerRouter);
router.use('/login', loginRouter);


router.use(function(req, res, next){
	var token = req.body.token || req.query.token || req.headers['auth'];
	if(token){
		console.log('has token');

	    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	        req.decoded = decoded;    
	        next();
	      }
	    });

	}else{
		return res.json({ success: false, message: 'Failed to authenticate token.' });	
	}
});


router.use('/user', userRouter);

//Category
router.use('/category', categoryRouter);

//Item in Category
router.use('/category/:categoryid/item', itemRouter);

//Each Item
router.use('/item/', itemRouter);


//Supplier
router.use('/supplier', supplierRouter);

// Customer
router.use('/customer', customerRouter);


// Purchase Order
router.use('/porder', purchaseOrderRouter);

// Purchase Order Item
router.use('/porder/:porderid/pitem', purchaseOrderItemRouter);

// Purchase Order Payment Item
router.use('/porder/:porderid/ppayment', purchaseOrderPaymentRouter);


// Sale Order
router.use('/sorder', saleOrderRouter);

// Sale Order Item
router.use('/sorder/:sorderid/sitem', saleOrderItemRouter);

// Sale Order Payment Item
router.use('/sorder/:sorderid/spayment', saleOrderPaymentRouter);




// 404
router.use(function(req, res, next){
	res.status(404).send('API not found');
	next();
});

module.exports = router;