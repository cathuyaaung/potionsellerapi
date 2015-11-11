
var router = require('express').Router();
var models = require('./../models');
var Category = models.Category;

// Find all
router.get('/', function(req, res){ 
	Category.find(function(err, categories){
		if (err) {
			res.send(err);
		} else {
			res.json(categories);
		}
	});
});

// Insert
router.route('/').post(function(req, res){	
	var category = new Category;
	category.name = req.body.name;
	category.desc = req.body.desc;
	category.save(function(err){
		if (err) {
			res.send(err);
		} else {
			res.json( {message: 'Category created'} );
		}
	});
});

// Find One
router.get('/:id', function(req, res){
	Category.findById(req.params.id, function(err, category){
		if (err) {
			res.send(err);
		} else {
			res.json(category);
		}
	});
});

// Update
router.put('/:id', function(req, res){
	Category.findById(req.params.id, function(err, category){
		if (err) {
			res.send(err);
		} else {
			category.name = req.body.name;
			category.desc = req.body.desc;
			category.save(function(err){
				if (err) {
					res.send(err);
				} else {
					res.json( {message: 'Category updated'} );
				}
			});
		}
	});
});

// Delete
router.delete('/:id', function(req, res){
	Category.remove({
		_id: req.params.id
	}, function(err, category){
		if (err) {
			res.send(err);
		} else {
			res.json( { message: 'category deleted' } );
		}
	});
});



module.exports = router;