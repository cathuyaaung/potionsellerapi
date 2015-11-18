var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var PurchaseOrder = models.PurchaseOrder;
var PurchaseOrderItem = models.PurchaseOrderItem;
var Item = models.Item;
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/', function(req, res){ 
	PurchaseOrderItem.find({purchaseorder: new ObjectId(req.params.porderid)}).exec(function(err, porderitems){
		if (err) { res.status(500).send(err); } else {
			res.json(porderitems);
		}
	});
});

router.post('/', function(req, res){ 
	PurchaseOrder.findById(req.params.porderid, function(err, porder){
		var porderitem = new PurchaseOrderItem;
		porderitem.count = req.body.count;
		porderitem.price = req.body.price;
		porderitem.item = req.body.item;
		porderitem.purchaseorder = porder;
		porderitem.save(function(err){
			if (err) { res.status(500).send('unable to create purchase order item' + err); } else {
				Item.findById(porderitem.item, function(err, item){
					item.count = item.count + porderitem.count;
					item.save(function(err){
						if (err) { res.status(500).send('unable to update item count' + err); } else {
							console.log(item);
							porderitem.item = item;
							res.json(item);			
						}
					}); // save item
				}); // find item
			}
		}); // save porderitem
	});// find purchase order	
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