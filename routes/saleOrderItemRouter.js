var _ 			= require('lodash');
var router 		= require('express').Router({mergeParams: true});
var models 		= require('./../models');
var ObjectId 	= require('mongoose').Types.ObjectId;

var SaleOrder 		= models.SaleOrder;
var SaleOrderItem 	= models.SaleOrderItem;
var Item 			= models.Item;



// router.get('/', function(req, res){ 
// 	SaleOrderItem.find({purchaseorder: new ObjectId(req.params.porderid)}).exec(function(err, porderitems){
// 		if (err) { res.status(500).send(err); } else {
// 			res.json(porderitems);
// 		}
// 	});
// });

router.post('/', function(req, res){ 
	SaleOrder.findById(req.params.sorderid, function(err, sorder){
		var sorderitem = new SaleOrderItem;
		sorderitem.count = req.body.count;
		sorderitem.price = req.body.price;
		sorderitem.item = req.body.item;
		sorderitem.saleorder = sorder;
		sorderitem.save(function(err){
			if (err) { res.status(500).send('unable to create sale order item' + err); } else {
				Item.findById(sorderitem.item, function(err, item){
					item.count = item.count - sorderitem.count;
					item.save(function(err){
						if (err) { res.status(500).send('unable to update item count' + err); } else {
							console.log(item);
							sorderitem.item = item;
							res.json(item);			
						}
					}); // save item
				}); // find item
			}
		}); // save sorderitem
	});// find sale order	
});

// router.get('/:supplierid', function(req, res){
// 	console.log(req.params.supplierid);
// 	Supplier.findById(req.params.supplierid, function(err, supplier){
// 		res.json(supplier);
// 	});
// });

// router.put('/:supplierid', function(req, res){ 
// 	if (req.params.supplierid != undefined && req.params.supplierid != null) {
// 		Supplier.findById(req.params.supplierid, function(err, supplier){
// 			supplier.name = req.body.name;
// 			supplier.desc = req.body.desc;
// 			supplier.save(function(err){
// 				res.json(supplier);
// 			});
// 		});
// 	} else {
// 		res.status(500).send('invalid supplierid');
// 	}
// });

// router.delete('/:supplierid', function(req, res){
// 	Supplier.remove({_id: req.params.supplierid}, function(err){
// 		if (err) { res.status(500).send('unable to delete supplier'); } else {
// 			res.json({message: 'supplier deleted'});
// 		}
// 	})
// });


module.exports = router;