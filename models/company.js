var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
	code: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	status: {
		type: String,
		default: 'ACTIVE'
	},
	registerdate: {
		type: Date,
		default: Date.now
	},
	expirydate: {
		type: Date,
		default: Date.now
	},
	tier: {
		type: Number,
		default: 1
		// Tier 1 500 Items
		// Tier 2 150 Items
		// Tier 3 50 Items
	},
	alloweditemcount: {
		type: Number,
		default: 500
	}
});

CompanySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Company', CompanySchema);
