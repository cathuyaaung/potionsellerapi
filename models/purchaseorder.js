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
	}	
});

PurchaseOrderSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
