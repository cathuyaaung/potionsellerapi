var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseOrderSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	supplier: {
		type: Schema.ObjectId,
		ref: 'Supplier',
		required: true
	},
	total: {
		type: Number,
		required: true,
		default: 0
	},
	remaining: {
		type: Number,
		required: true,
		default: 0
	}	
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);