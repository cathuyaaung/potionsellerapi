var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 100
	},
	desc: {
		type: String,
		required: false,
		maxlength: 500
	}
});

module.exports = mongoose.model('Customer', CustomerSchema);