var mongoose = require('mongoose');

var SupplierSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Supplier', SupplierSchema);