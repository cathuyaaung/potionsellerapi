
var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Category = models.Category;

// HANDLES Requests at -> /category
// GET ALL, POST, GET ONE, PUT, DELETE


// GET ALL
router.get('/', function(req, res){ 
	Category.find({company: req.decoded.company}).exec(function(err, categories){
		if (err) { res.send(err); } else {
			res.json(categories);
		}
	});
});

// POST
router.route('/').post(function(req, res){	
	console.log(req.decoded.company);
	var category = new Category;
	category.company = req.decoded.company;
	category.name = req.body.name;
	category.desc = req.body.desc;
	category.save(function(err){
		if (err) { 
			console.log(err);
			res.send(err); 
		} else {
			res.json( { message: 'Category created', data: category } );	
		}
	});
});

// GET ONE
router.get('/:id', function(req, res){
	Category.findById(req.params.id, function(err, category){
		if (err) { res.send(err); } else {
			res.json(category);
	    }
	});
});

// PUT
router.put('/:id', function(req, res){
	Category.findById(req.params.id, function(err, category){
		if (err) { res.status(500).send('category not found'); } else {
			if (!category === undefined && category === null) {
				category.name = req.body.name;
				category.desc = req.body.desc;
				category.save(function(err){
					console.log(category);
					if (err) { res.send(err); } else {
						res.json( {message: 'Category updated', data: category} );
					}
				});
			} else {
				console.log(category);
			}
		}
	});
});

// DELETE
router.delete('/:id', function(req, res){
	Category.remove({ _id: req.params.id }, function(err, category){
		if (err) { res.send(err); } else {
			res.json( { message: 'category deleted' } );
		}
	});
});



module.exports = router;