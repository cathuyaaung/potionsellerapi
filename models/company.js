var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
	code: {
		type: String,
		required: true,
		unique: true
	}
});

CompanySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Company', CompanySchema);
