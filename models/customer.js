var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
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


CustomerSchema.plugin(require('mongoose-autopopulate'));
CustomerSchema.plugin(require('mongoose-timestamp'));


module.exports = mongoose.model('Customer', CustomerSchema);