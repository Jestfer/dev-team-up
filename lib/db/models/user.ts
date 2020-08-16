import mongoose from '../db';
import bcrypt from 'bcrypt';

const userSchema: mongoose.Schema = new mongoose.Schema({
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

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  username: string;
  mainProgrammingLanguage: string;
  verificationCrypto: string;
  verifiedAt: null | Date;
  generateHash: (password: string) => string;
  validPassword: (password: string) => boolean;
}

// https://stackoverflow.com/a/43761258/8243590
const User: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
