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
	count: {
		type: Number,
		required: true,
		default: 0
	},
	suggestedsaleprice: {
		type: Number,
		required: true,
		default: 0
	},
	buyprice: {
		type: Number,
		default: 0
	},
	lowinventorythreshold: {
		type: Number,
		required: true,
		default: 1
	},
	category: {
		type: Schema.ObjectId,
		ref: 'Category',
		autopopulate: true,
		required: false
	},
	company: {
		type: Schema.ObjectId,
		ref: 'Company',
		autopopulate: true,
		required: false		
	}	
});

ItemSchema.plugin(require('mongoose-autopopulate'));
ItemSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Item', ItemSchema);