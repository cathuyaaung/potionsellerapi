var _ 		= require('lodash');
var async 	= require('async');
var router 	= require('express').Router({mergeParams: true});
var models 	= require('./../models');
var ObjectId = require('mongoose').Types.ObjectId;

var PurchaseOrder 		= models.PurchaseOrder;
var PurchaseOrderPayment= models.PurchaseOrderPayment;
var Supplier 			= models.Supplier;
var Item 				= models.Item;

router.get('/', function(req, res){ 
	PurchaseOrder.find().sort({updatedAt: -1}).exec(function(err, porders){
		if (err) { res.status(500).send(err); } else {
			res.json(porders);
		}
	});
});

router.post('/', function(req, res){ 
	console.log(req.body);
	// res.json('ok');

	var porder = new PurchaseOrder;
	porder.supplier = req.body.supplier;
	porder.total = req.body.total;
	porder.remaining = req.body.remaining;
	porder.poitems = req.body.poitems;
	porder.save(function(err){
		if (err) { 
			res.status(500).send('unable to create purchase order ' + err); 
		} else {


			async.each(porder.poitems, function(poitem, callback){
				console.log(poitem.item);
				Item.findById(poitem.item, function(err, item){
					item.count = item.count + poitem.count;
					item.save(function(err){
						if (err) { res.status(500).send('unable to update item count' + err); } else {
							console.log(item.name + ' increased by ' + poitem.count);
							callback();
						}
					}); // save item
				}); // find item
								
			}, function(err){
				res.json({
					success: true,
					data: porder
				});
			});



		}
	});

});

router.get('/:porderid', function(req, res){
	Supplier.findById(req.params.porderid, function(err, porder){
		res.json(porder);
	});
});


router.post('/:porderid/addpayment', function(req, res){
	PurchaseOrder.findById(req.params.porderid).exec(function(err, porder){
		if (err) { res.status(500).json({success: false, message: 'unable to find purchase order'}); } else {
			console.log(porder);
			var payment = new PurchaseOrderPayment;
			payment.amount = req.body.amount;
			// {
			// 	amount: req.body.amount
			// };
			porder.popayments.push(payment);
			porder.remaining = porder.remaining - req.body.amount;
			porder.save(function(err){
				console.log(porder)
				res.json({
					success: true,
					data: porder
				});
			});
		}
	});
});

router.delete('/:porderid', function(req, res){
	PurchaseOrder.findById(req.params.porderid).exec(function(err, porder){
		if (err) { res.status(500).json({success: false, message: 'unable to find purchase order'}); } else {
			async.each(porder.poitems, function(poitem, callback){
				console.log(poitem.item);
				Item.findById(poitem.item, function(err, item){
					item.count = item.count - poitem.count;
					item.save(function(err){
						if (err) { res.status(500).send('unable to update item count' + err); } else {
							console.log(item.name + ' decreased by ' + poitem.count);
							callback();
						}
					}); // save item
				}); // find item								
			}, function(err){
				PurchaseOrder.remove({_id: req.params.porderid}, function(err){
					if (err) { res.status(500).json({success: false, message: 'unable to delete purchase order'}); } else {
						res.json({success: true, message: 'purchase order deleted'});
					}
				});
			});
		}
	});
});


module.exports = router;