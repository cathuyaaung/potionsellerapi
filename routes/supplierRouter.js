var async 	= require('async');

var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Supplier = models.Supplier;
var PurchaseOrder = models.PurchaseOrder;


router.get('/', function(req, res){ 
	var result=[];

	Supplier.find(function(err, suppliers){
		if (err) { res.status(500).send(err); } else {
			async.each(suppliers, function(supplier, callback){			
				
				var supplierObj = supplier.toObject();				

				PurchaseOrder.find({supplier: supplier}, function(err, porders){
					var supplierTotalRemaining = 0
					for(var i=0; i<porders.length; i++){
						supplierTotalRemaining = supplierTotalRemaining + porders[i].remaining;
					}
					supplierObj.totalremaining = supplierTotalRemaining;
					result.push(supplierObj);
					callback();					
				});

			}, function(err){
				res.json(result);
			});
		}
	});
});

router.post('/', function(req, res){ 
	var supplier = new Supplier;
	supplier.name = req.body.name;
	supplier.desc = req.body.desc;
	supplier.save(function(err){
		if (err) { res.status(500).send('unable to create supplier'); } else {
			res.json(supplier);
		}
	});
});

router.get('/:supplierid', function(req, res){
	console.log(req.params.supplierid);
	Supplier.findById(req.params.supplierid, function(err, supplier){
		res.json(supplier);
	});
});

router.put('/:supplierid', function(req, res){ 
	if (req.params.supplierid != undefined && req.params.supplierid != null) {
		Supplier.findById(req.params.supplierid, function(err, supplier){
			supplier.name = req.body.name;
			supplier.desc = req.body.desc;
			supplier.save(function(err){
				res.json(supplier);
			});
		});
	} else {
		res.status(500).send('invalid supplierid');
	}
});

router.delete('/:supplierid', function(req, res){
	Supplier.remove({_id: req.params.supplierid}, function(err){
		if (err) { res.status(500).send('unable to delete supplier'); } else {
			res.json({message: 'supplier deleted'});
		}
	})
});


module.exports = router;