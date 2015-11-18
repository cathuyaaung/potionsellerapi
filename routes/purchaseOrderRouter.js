var _ 		= require('lodash');
var router 	= require('express').Router({mergeParams: true});
var models 	= require('./../models');
var ObjectId = require('mongoose').Types.ObjectId;

var PurchaseOrder 		= models.PurchaseOrder;
var PurchaseOrderItem 	= models.PurchaseOrderItem;
var Supplier 			= models.Supplier;
var Item 				= models.Item;

router.get('/', function(req, res){ 
	PurchaseOrder.find().sort({date: -1}).exec(function(err, porders){
		if (err) { res.status(500).send(err); } else {
			res.json(porders);
		}
	});
});

router.post('/', function(req, res){ 
	Supplier.findById(req.body.supplier, function(err, supplier){
		var porder = new PurchaseOrder;
		porder.supplier = supplier._id;
		porder.total = req.body.total;
		porder.remaining = req.body.remaining;
		console.log(porder);
		porder.save(function(err){
			if (err) { res.status(500).send('unable to create purchase order ' + err); } else {
				res.json(porder);
			}
		});
	});
});

router.get('/:porderid', function(req, res){
	Supplier.findById(req.params.porderid, function(err, porder){
		res.json(porder);
	});
});


router.delete('/:porderid', function(req, res){
	//F ind POItems
	PurchaseOrderItem.find({purchaseorder: new ObjectId(req.params.porderid)}).exec(function(err, porderitems){
		_.forEach(porderitems, function(n){
			// Deduct Item Count
			Item.findById(n.item._id, function(err, item){
				item.count = item.count - n.count;
				item.save(function(err){
					if (err) { res.status(500).send('unable to update item count' + err); } else {
						console.log('deducted');
					}
				}); // save item
			}); // find item
			// Delete POItem
			n.remove(function(err){
				if (err) { res.status(500).send('unable to delete purchase order item'); } else {
					console.log('poitem deleted');
				}
			});
		});
	});
	//Delete POItems
	//Deduct Item counts
	PurchaseOrder.remove({_id: req.params.porderid}, function(err){
		if (err) { res.status(500).send('unable to delete purchase order'); } else {
			res.json({message: 'purchase order deleted'});
		}
	})
});


module.exports = router;