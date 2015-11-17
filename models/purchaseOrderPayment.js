var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseOrderPaymentSchema = new Schema({
	purchaseOrder: {
		type: Schema.ObjectId,
		ref: 'PurchaseOrder',
		required: true
	},	
	date: {
		type: Date,
		default: Date.now
	},
	amount: {
		type: Number,
		default: 0,
		required: true
	}
});

module.exports = mongoose.model('PurchaseOrderPayment', PurchaseOrderPaymentSchema);