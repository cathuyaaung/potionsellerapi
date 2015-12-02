var mongoose 	= require('mongoose');
var timestamp 	= require('mongoose-timestamp')
var Schema 		= mongoose.Schema;


var PurchaseOrderItemSchema = new Schema({
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

var PurchaseOrderPaymentSchema = new Schema({
	amount: {
		type: Number,
		default: 0,
		required: true
	},
	date: { type: Date, default: Date.now}
});

var PurchaseOrderSchema = new Schema({
	supplier: {
		type: Schema.ObjectId,
		ref: 'Supplier',
		required: false, 
		autopopulate: true
	},
	total: {
		type: Number,
		required: false,
		default: 0
	},
	remaining: {
		type: Number,
		required: false,
		default: 0
	},
	poitems: [PurchaseOrderItemSchema],
	popayments: [PurchaseOrderPaymentSchema]
});




PurchaseOrderSchema.plugin(require('mongoose-autopopulate'));
PurchaseOrderSchema.plugin(timestamp);
PurchaseOrderItemSchema.plugin(require('mongoose-autopopulate'));
PurchaseOrderPaymentSchema.plugin(timestamp);

// module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
exports.PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
exports.PurchaseOrderItem = mongoose.model('PurchaseOrderItem', PurchaseOrderItemSchema);
exports.PurchaseOrderPayment = mongoose.model('PurchaseOrderPayment', PurchaseOrderPaymentSchema);