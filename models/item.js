var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
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
	category: {
		type: Schema.ObjectId,
		ref: 'Category'
	}
});

module.exports = mongoose.model('Item', ItemSchema);