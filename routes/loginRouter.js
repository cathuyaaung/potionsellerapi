var jwt = require('jsonwebtoken');
var app = require('../server');

var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Company = models.Company;
var User = models.User;


router.post('/', function(req, res){ 
	Company.findOne({code: req.body.companycode}, function(err, company){
		if(company != null){
			User.findOne({username: req.body.username, password: req.body.password})
			.select('-password')
			.exec(function(err, user){
				if(user != null){

					//check user validity

					var token = jwt.sign(user, req.app.get('superSecret'), {
						expiresIn: 1440*60
					});						
					console.log(user);
					res.json({
						success: true,
						data: user, 
						token: token
					});
				} else {
					res.status(500).send('user not found');		
				}
			});
		} else {
			res.status(500).send('company not found');
		}
	});

});

module.exports = router;