var _ 		= require('lodash');
var async 	= require('async');
var router 	= require('express').Router({mergeParams: true});
var models 	= require('./../models');
var ObjectId = require('mongoose').Types.ObjectId;

var SaleOrder 		= models.SaleOrder;
var SaleOrderItem 	= models.SaleOrderItem;
var Customer 			= models.Customer;
var Item 				= models.Item;

router.get('/', function(req, res){ 
	var result = [];

	SaleOrder.find().limit(20).sort({date: -1}).exec(function(err, sorders){
		if (err) { res.status(500).send(err); } else {
			async.each(sorders, function(sorder, callback){
				SaleOrderItem.find({saleorder: sorder._id}).limit(5).exec(function(err, sorderitems){					
					sorderJSON = sorder.toJSON();
					sorderJSON.sorderitems = sorderitems;
					console.log(sorderJSON);
					result.push(sorderJSON);
					callback();
				});									
			}, function(err){
				//console.log(result);
				res.json(result);
			});
		}
	});
});

router.post('/', function(req, res){ 
	var saleCustomer = null;
	if(req.body.customerid){
		Customer.findById(req.body.customerid, function(err, customer){
			saleCustomer = customer;
		});
	}
	var sorder = new SaleOrder;
	if(saleCustomer) {
		sorder.customer = saleCustomer._id;	
	}	
	sorder.total = req.body.total;
	sorder.remaining = req.body.remaining;
	console.log(sorder);
	sorder.save(function(err){
		if (err) { res.status(500).send('unable to create sale order ' + err); } else {
			res.json(sorder);
		}
	});

});


module.exports = router;