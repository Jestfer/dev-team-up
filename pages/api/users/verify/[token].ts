import User from '../../../../lib/db/models/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { token },
  } = req;

  try {
    const user = await User.where('verificationCrypto', token).findOne().exec();

    if (!user || user.verifiedAt) return res.status(400).send({ message: 'Unable to verify token' });
    user.verifiedAt = new Date();

    res.writeHead(302, { Location: '/login' });
    res.end();
  } catch (e) {
    res.status(500).send(e.message);
  }
};
