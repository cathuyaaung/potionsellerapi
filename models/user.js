var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'USER'
	},
	password: {
		type: String,
		required: true
	},
	company: {
		type: Schema.ObjectId,
		ref: 'Company',
		required: false, 
		autopopulate: true
	},
	token: {
		type: String
	}
});

UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', UserSchema);
