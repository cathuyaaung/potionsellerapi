var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
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
		required: true
	}
});


CategorySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Category', CategorySchema);