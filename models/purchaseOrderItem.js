var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseOrderItemSchema = new Schema({
	purchaseOrder: {
		type: Schema.ObjectId,
		ref: 'PurchaseOrder',
		required: true
	},	
	item: {
		type: Schema.ObjectId,
		ref: 'Item',
		required: true
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

module.exports = mongoose.model('PurchaseOrderItem', PurchaseOrderItemSchema);