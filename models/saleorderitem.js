var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleOrderItemSchema = new Schema({
	saleorder: {
		type: Schema.ObjectId,
		ref: 'SaleOrder',
		required: true
	},	
	item: {
		type: Schema.ObjectId,
		ref: 'Item',
		required: true,
		autopopulate: true
	},
	count: {
		type: Number,
		required: true,
		default: 0
	},
	price: {
		type: Number,
		required: true,
		default: 0
	}
});

SaleOrderItemSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('SaleOrderItem', SaleOrderItemSchema);