var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleOrderSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	customer: {
		type: Schema.ObjectId,
		ref: 'Customer',
		required: false, 
		autopopulate: true
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

SaleOrderSchema.set('toJSON', { getters: true, virtuals: false });

SaleOrderSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('SaleOrder', SaleOrderSchema);