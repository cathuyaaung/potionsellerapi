var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SaleOrderItemSchema = new Schema({
	item: 	{ type: Schema.ObjectId, ref: 'Item', required: true, autopopulate: true },
	count: 	{ type: Number, required: true, default: 0 },
	price: 	{ type: Number, required: true, default: 0 }
});


var SaleOrderPaymentSchema = new Schema({
	date: 	{ type: Date, default: Date.now },
	amount: { type: Number, default: 0, required: true }
});


var SaleOrderSchema = new Schema({
	company: 	{ type: Schema.ObjectId, ref: 'Company',  autopopulate: true, required: false },
	customer: 	{ type: Schema.ObjectId, ref: 'Customer', autopopulate: true, required: false },
	total: 		{ type: Number, required: true, default: 0 },
	remaining: 	{ type: Number, required: true, default: 0 },
	soitems: 	[SaleOrderItemSchema],
	sopayments: [SaleOrderPaymentSchema]
});

SaleOrderSchema.plugin(require('mongoose-autopopulate'));
SaleOrderSchema.plugin(require('mongoose-timestamp'));

exports.SaleOrder 			= mongoose.model('SaleOrder', SaleOrderSchema);
exports.SaleOrderItem 		= mongoose.model('SaleOrderItem', SaleOrderItemSchema);
exports.SaleOrderPayment 	= mongoose.model('SaleOrderPayment', SaleOrderPaymentSchema);