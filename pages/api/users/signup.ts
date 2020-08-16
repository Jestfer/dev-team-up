import User from '../../../lib/db/models/user';
import { emailIsValid } from '../../../lib/controllers/userController';
import crypto from 'crypto';
import nodeMailer from '../../../lib/mailing/nodeMailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!emailIsValid(req.body.email)) return res.status(400).json({ message: 'The email format seems to be invalid' });

  try {
    // TODO: understand why .exec is allowed here and not on line 19
    const existingUsers = await User.find({
      $or: [{ username: req.body.username.toLowerCase() }, { email: req.body.email.toLowerCase() }],
    }).exec();
    if (existingUsers.length) return res.status(400).json({ message: 'User already exists' });

    const newUser = await generateUserInstance(req.body);

    await newUser.save();

    // TODO: protocol (HTTP/HTTPS) is missing - in ENV var with URL
    const verificationLink = `${req.headers.host}/api/users/verify/${newUser.verificationCrypto}`;
    const emailInfo = {
      name: newUser.username,
      subject: 'Please verify your email address',
      recipient: newUser.email,
      verificationLink,
    };
    nodeMailer(emailInfo, 'verifyEmail');

    return res.status(201).send({ name: newUser.username });
  } catch (e) {
    res.status(500).send(e.message);
  }
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
