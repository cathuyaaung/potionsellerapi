
var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Category = models.Category;
var Item = models.Item;

// HANDLES Requests at -> /category/:categoryid/item 
// GET ALL, POST, GET ONE, PUT, DELETE

router.get('/itemcount', function(req, res){
	Item.count({company: req.decoded.company}).exec(function(err, count){
		if(err){
			res.status(500).json({
				success: false,
				data: err
			});
		} else {
			res.json({
				success: true,
				data: count
			});
		}
	});
});


module.exports = router;