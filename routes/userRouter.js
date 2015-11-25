var jwt = require('jsonwebtoken');
var app = require('../server');

var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Company = models.Company;
var User = models.User;

router.post('/register', function(req, res){ 
	var company = new Company;
	company.code = req.body.companycode;
	company.save(function(err){
		if (err) { res.status(500).send('unable to create company'); } else {
			var user = new User;
			user.username = req.body.username;
			user.password = req.body.password;
			user.company = company;
			user.save(function(err){
				if (err) { res.status(500).send('unable to create user'); } else {

					var token = jwt.sign(user, req.app.get('superSecret'), {
						expiresIn: 1440*60
					});

					user.token = token;
						user.save(function(err, user){
							if(err){res.send('user update failed');} else {
								if (user != null) {
									res.json({
										success: true,
										data: {
											username: user.username, 
											company: company
										}, 
										token: token
									});
								}
							}
						});

					res.json(user);
				}
			});
		}
	});
});

router.post('/login', function(req, res){ 
	Company.findOne({code: req.body.companycode}, function(err, company){
		if(company != null){
			User.findOne({username: req.body.username}, function(err, user){
				if(user != null){
					if(user.password == req.body.password){
						var userObj = {
							username: user.username,
							company: company
						};

						var token = jwt.sign(userObj, req.app.get('superSecret'), {
							expiresIn: 1440*60
						});
						//user.token = token;
						user.save(function(err, user){
							if(err){res.send('user update failed');} else {
								if (user != null) {
									res.json({
										success: true,
										data: {
											username: user.username, 
											company: company
										}, 
										token: token
									});
								}
							}
						});
					}else{
						res.status(500).send('password not match');		
					}
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