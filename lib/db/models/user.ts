import mongoose from '../db';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  mainProgrammingLanguage: String,
  verificationCrypto: String,
  verifiedAt: null || Date,
});

userSchema.methods.generateHash = async function (password) {
  const salt = await bcrypt.genSalt(8);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// https://stackoverflow.com/a/43761258/8243590
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
