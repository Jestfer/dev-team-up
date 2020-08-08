import User from '../../../lib/db/models/user';
import { emailIsValid } from '../../../lib/controllers/userController';
import crypto from 'crypto';
import nodeMailer from '../../../lib/mailing/nodeMailer';

export default async (req, res) => {
  if (!emailIsValid(req.body.email)) return res.status(400).json({ message: 'The email format seems to be invalid' });

  const existingUsers = await User.find(
    { $or: [{ username: req.body.username.toLowerCase() }, { email: req.body.email.toLowerCase() }] },
    (err, users) => {
      if (err) return res.send(err);
      return users;
    }
  );
  if (existingUsers.length) return res.status(400).json({ message: 'User already exists' });

  const newUser = await generateUserInstance(req.body);

  newUser.save((err, user) => {
    if (err) return console.error(err);

    // TODO: protocol (HTTP/HTTPS) is missing
    const verificationLink = `${req.headers.host}/api/users/verify/${newUser.verificationCrypto}`;
    const emailInfo = {
      name: newUser.username,
      subject: 'Please verify your email address',
      recipient: newUser.email,
      verificationLink,
    };
    nodeMailer(emailInfo, 'verifyEmail');

    return res.status(201).send({ name: user.username });
  });
};

// TODO: improve this with deconstruction
const generateUserInstance = async (userData) => {
  let newUser = new User();

  newUser.email = userData.email.toLowerCase();
  newUser.password = await newUser.generateHash(userData.password);
  newUser.username = userData.username.toLowerCase();
  newUser.mainProgrammingLanguage = userData.mainProgrammingLanguage;
  newUser.verificationCrypto = crypto.randomBytes(30).toString('hex');
  newUser.verifiedAt = null;

  return newUser;
};
