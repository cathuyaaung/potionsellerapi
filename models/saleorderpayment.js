var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleOrderPaymentSchema = new Schema({
	saleorder: {
		type: Schema.ObjectId,
		ref: 'SaleOrder',
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

module.exports = mongoose.model('SaleOrderPayment', SaleOrderPaymentSchema);