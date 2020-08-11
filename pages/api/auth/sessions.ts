import { withIronSession } from 'next-iron-session';
import User from '../../../lib/db/models/user';

export default withIronSession(
  async (req, res) => {
    if (req.method === 'DELETE') {
      req.session.destroy();
      res.end();
    }

    if (req.method === 'POST') {
      const { email, password } = req.body;

      try {
        const user = await User.where({ email }).findOne().exec();
        if (!user) res.status(403).end();

        const validPassword = await user.validPassword(password);
        if (!validPassword) res.status(403).end();

        req.session.set('user', { email });
        await req.session.save();
        return res.status(201).end();
      } catch (e) {
        /* 
          TODO: refactor and write a generic error handling function
          TODO: error handling, with dictionary of error codes, shared for BE and FE
        */
        res.status(500).send(e.message);
      }
    }

    return res.status(404).end();
  },
  {
    cookieName: 'MYSITECOOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);
