var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Customer = models.Customer;


router.get('/', function(req, res){ 
	Customer.find(function(err, suppliers){
		if (err) { res.status(500).send(err); } else {
			res.json(suppliers);
		}
	});
});

router.post('/', function(req, res){ 
	var customer = new Customer;
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