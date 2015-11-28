var jwt = require('jsonwebtoken');
var app = require('../server');

var router = require('express').Router({mergeParams: true});
var models = require('./../models');
var Company = models.Company;
var User = models.User;

router.post('/', function(req, res){ 

	Company.findOne({code:req.body.companycode}, function(err, company){
		if(err){
			console.log('cant find comapny');
			res.status(500).send('unable to create company'); 
		}else{
			if(company){
				res.status(500).send('existing company'); 
			} else {
				var company = new Company;
				company.code = req.body.companycode;
				company.tier = req.body.tier || 1;
				var today = new Date();
				var onemonthaftertoday = today.setDate(today.getDate() + 30);
				company.expirydate = onemonthaftertoday;
				switch(req.body.tier){
					case 3:
						company.alloweditemcount = 50;
						break;
					case 2:
						company.alloweditemcount = 150;
						break;
					case 1:
						company.alloweditemcount = 500;
						break;
				}
				console.log(company);
				company.save(function(err){
					if (err) { 
						console.log(err);
						res.status(500).send('unable to create company'); 
					} else {
						var user = new User;
						user.username = req.body.username;
						user.password = req.body.password;
						user.company = company;
						user.save(function(err){
							if (err) { 
								console.log(err);
								res.status(500).send('unable to create user'); 
							} else {
								var token = jwt.sign(user, req.app.get('superSecret'), 
									{ expiresIn: 1440*60 });

								// console.log(user);

								res.json({
									success: true,
									data: user, 
									token: token
								});
							}
						});
					}
				});
			}
		}
	});
});



module.exports = router;