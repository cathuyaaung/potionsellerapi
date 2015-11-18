var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseOrderItemSchema = new Schema({
	purchaseorder: {
		type: Schema.ObjectId,
		ref: 'PurchaseOrder',
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

PurchaseOrderItemSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('PurchaseOrderItem', PurchaseOrderItemSchema);