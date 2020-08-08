import User from '../../../../lib/db/models/user';

export default async (req, res) => {
  const {
    query: { token },
  } = req;

  await User.where({ verificationCrypto: token }).findOne((err, user) => {
    if (err) res.send(err);
    if (user.verifiedAt) return res.status(400).send({ message: 'User has been already verified' });

    user.verifiedAt = new Date();
    user.save();
  });

  res.writeHead(301, { Location: 'http://localhost:3000/login' });
  res.end();
};
