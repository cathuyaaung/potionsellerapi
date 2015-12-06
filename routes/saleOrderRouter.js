var _ 		= require('lodash');
var async 	= require('async');
var router 	= require('express').Router({mergeParams: true});
var models 	= require('./../models');
var ObjectId = require('mongoose').Types.ObjectId;

var SaleOrder 			= models.SaleOrder;
var SaleOrderPayment 	= models.SaleOrderPayment;
var Customer 			= models.Customer;
var Item 				= models.Item;

router.get('/', function(req, res){ 
	SaleOrder.find({company:req.decoded.company}).sort({updatedAt: -1}).exec(function(err, sorders){
		if (err) { res.status(500).send(err); } else {
			res.json(sorders);
		}
	});
});

router.post('/', function(req, res){ 
	var sorder = new SaleOrder;
	sorder.company = req.decoded.company;
	sorder.customer = req.body.customer;
	sorder.total = req.body.total;
	sorder.remaining = req.body.remaining;
	sorder.soitems = req.body.soitems;
	sorder.save(function(err){
		if (err) { 
			res.status(500).send('unable to create sale order ' + err); 
		} else {
			async.each(sorder.soitems, function(soitem, callback){
				Item.findById(soitem.item, function(err, item){
					item.count = item.count - soitem.count;
					item.save(function(err){
						if (err) { res.status(500).send('unable to update item count' + err); } else {
							console.log(item.name + ' decreased by ' + soitem.count);
							callback();
						}
					}); // save item
				}); // find item								
			}, function(err){
				res.json({ success: true, data: sorder });
			});
		}
	});
});


router.post('/:sorderid/addpayment', function(req, res){
	SaleOrder.findById(req.params.sorderid).exec(function(err, sorder){
		if (err) { res.status(500).json({success: false, message: 'unable to find sale order'}); } else {
			var payment = new SaleOrderPayment;
			payment.amount = req.body.amount;
			sorder.sopayments.push(payment);
			sorder.remaining = sorder.remaining - req.body.amount;
			sorder.save(function(err){
				res.json({ success: true, data: sorder });
			});
		}
	});
});

router.delete('/:sorderid', function(req, res){
	SaleOrder.findById(req.params.sorderid).exec(function(err, sorder){
		if (err) { res.status(500).json({success: false, message: 'unable to find sale order'}); } else {
			
			async.each(sorder.soitems, function(soitem, callback){
				console.log(soitem.item);
				Item.findById(soitem.item, function(err, item){
					item.count = item.count - soitem.count;
					item.save(function(err){
						if (err) { res.status(500).send('unable to update item count' + err); } else {
							console.log(item.name + ' decreased by ' + soitem.count);
							callback();
						}
					}); // save item
				}); // find item								
			}, function(err){
				SaleOrder.remove({_id: req.params.sorderid}, function(err){
					if (err) { 
						res.status(500).json({success: false, message: 'unable to delete sale order'}); 
					} else {
						res.json({success: true, message: 'sale order deleted'});
					}
				});
			});

		}
	});
});



module.exports = router;