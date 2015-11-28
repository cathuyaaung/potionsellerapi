var jwt = require('jsonwebtoken');
var app = require('../server');

var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Company = models.Company;
var User = models.User;


router.get('/getaccountdetails', function(req, res){
	console.log(req.decoded);
	User.findById(req.decoded).select('-password').exec(function(err, user){
		if(err){
			res.json({
				success: false,
				data: 'user not found'
			});
		} else {
			if(user){
				res.json({
					success: true,
					data: user
				});
			} else {
				res.json({
					success: false,
					data: 'user not found'
				});
			}
		}
	});
});

module.exports = router;