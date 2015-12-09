
var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Category = models.Category;
var Item = models.Item;

// HANDLES Requests at -> /category/:categoryid/item 
// GET ALL, POST, GET ONE, PUT, DELETE

// GET ALL
router.get('/', function(req, res){ 
	Item.find({company: req.decoded.company, category: req.params.categoryid}).exec(function(err, items){
		if (err) { res.send(err); } else {
			Item.populate(items, { path:'category' }, function(err, items){
				if (err) { res.send(err); } else {
					res.json(items);	
				}
			});
		}
	});
});

// POST
router.route('/').post(function(req, res){	
	Category.findById(req.params.categoryid, function(err, category){
		if (err) { res.send(err); }
		console.log(category);
		var item = new Item;
		item.company = req.decoded.company;
		item.name = req.body.name;
		item.desc = req.body.desc;
		item.category = category;
		item.save(function(err){
			if (err) { res.send(err); } else {
				Item.populate(item, { path:'category' }, function(err, item){
					if (err) { res.send(err); } else {
						res.json( { message: 'item created', data: item } );
					}
				});
			}
		});			
	});
});

// GET ONE
router.get('/:itemid', function(req, res){ 
	Item.findById(req.params.itemid, function(err, item){
		if (err) { res.send(err); } else {
			Item.populate(item, {path:'category'}, function(err, item){
				if (err) { res.send(err); } else {
					res.json(item);
				}
			});
		}
	});
});

// PUT
router.put('/:itemid', function(req, res){ 
	Item.findById(req.params.itemid, function(err, item){
		if (err) { res.send(err); } else {
			item.name = req.body.name;
			item.desc = req.body.desc;
			item.save(function(err){
				if (err) { res.send(err); } else {
					Item.populate(item, {path:'category'}, function(err, item){
						if (err) { res.send(err); } else {
							res.json( { message: 'Item updated', data: item } );
						}
					});
				}
			});
		}
	});
});

// DELETE
router.delete('/:itemid', function(req, res){ 
	Item.remove({ _id: req.params.itemid }, function(err){
		if (err) { res.send(err); } else {
			res.json( { message: 'item deleted' } );
		}
	});
});


module.exports = router;