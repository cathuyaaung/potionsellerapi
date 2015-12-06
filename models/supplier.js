var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupplierSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: 100
	},
	desc: {
		type: String,
		required: false,
		maxlength: 500
	},
	company: {
		type: Schema.ObjectId,
		ref: 'Company',
		autopopulate: true,
		required: false		
	}	
});

SupplierSchema.plugin(require('mongoose-autopopulate'));
SupplierSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Supplier', SupplierSchema);