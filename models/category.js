var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 100
	},
	desc: {
		type: String,
		required: true,
		maxlength: 500
	}
});

module.exports = mongoose.model('Category', CategorySchema);