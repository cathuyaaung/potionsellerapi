// Environment configuration file.
// this file will exposes a function
// which returns key value object based on the Environment variable NODE_ENV
// NODE_ENV has to be assigned at command line, either 'dev' or 'pro'

// e.g. $ NODE_ENV=pro npm start
// e.g. $ NODE_ENV=dev npm start

// This module returns a function, because it checks the ENV variable
// and assign the key value pair dynamically

module.exports = function(){

	switch(process.env.NODE_ENV){

		case 'dev':
			return {
				port: 3333,
				dbhost: 'localhost',
				dbport: 27017,
				dbname: 'potionsellerdb'
			};

		case 'pro':
			return {
				port: 4444,
				dbhost: 'localhost',
				dbport: 27017,
				dbname: 'potionsellerdb'
			};

		default:
			return {
				port: 5555,
				dbhost: 'localhost',
				dbport: 27017,
				dbname: 'potionsellerdb'
			};

	}

}