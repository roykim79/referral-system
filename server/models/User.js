const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

const UserSchema = new Schema({
  username: { type: String, lowercase: true, unique: true },
  hash: String,
  salt: String,
  email: { type: String, default: null },
  organization: {type: Schema.Types.ObjectId, ref: 'Organization'},
  role: { type: String, default: 'user' },
  dateJoin: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  status: {type: String, default: 'pending' }
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;