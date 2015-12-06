var async 	= require('async');

var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Customer = models.Customer;
var SaleOrder = models.SaleOrder;

router.get('/', function(req, res){ 
	var result=[];
	Customer.find({company:req.decoded.company}).exec(function(err, customers){
		if (err) { res.status(500).send(err); } else {
			async.each(customers, function(customer, callback){							
				var customerObj = customer.toObject();				
				SaleOrder.find({customer: customer}, function(err, porders){
					var customerTotalRemaining = 0;
					for(var i=0; i<porders.length; i++){
						customerTotalRemaining = customerTotalRemaining + porders[i].remaining;
					}
					customerObj.totalremaining = customerTotalRemaining;
					result.push(customerObj);
					callback();					
				});
			}, function(err){ res.json(result); });
		}
	});
});

router.post('/', function(req, res){ 
	var customer = new Customer;
	customer.company = req.decoded.company;
	customer.name = req.body.name;
	customer.desc = req.body.desc;
	customer.save(function(err){
		if (err) { res.status(500).send('unable to create customer'); } else {
			res.json(customer);
		}
	});
});

router.get('/:customerid', function(req, res){
	console.log(req.params.customerid);
	Customer.findById(req.params.customerid, function(err, customer){
		res.json(customer);
	});
});

router.put('/:customerid', function(req, res){ 
	if (req.params.customerid != undefined && req.params.customerid != null) {
		Customer.findById(req.params.customerid, function(err, customer){
			customer.name = req.body.name;
			customer.desc = req.body.desc;
			customer.save(function(err){
				res.json(customer);
			});
		});
	} else {
		res.status(500).send('invalid customerid');
	}
});

router.delete('/:customerid', function(req, res){
	Customer.remove({_id: req.params.customerid}, function(err){
		if (err) { res.status(500).send('unable to delete customer'); } else {
			res.json({message: 'customer deleted'});
		}
	})
});


module.exports = router;