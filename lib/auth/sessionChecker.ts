import { withIronSession, Session } from 'next-iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

export const sessionChecker = withIronSession(
  async ({ req, res }: { req: NextApiRequest & { session: Session }; res: NextApiResponse }) => {
    const user = req.session.get('user');

    if (!user) {
      if (isPrivatePage(req.url)) {
        // TODO: [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        res.writeHead(302, { Location: '/login' });
        res.end();
        return { props: {} };
      } else {
        return { props: {} };
      }
    }

    if (!isPrivatePage(req.url)) {
      res.writeHead(302, { Location: '/dashboard' });
      res.end();
      return { props: {} };
    } else {
      return {
        props: { user },
      };
    }
  },
  {
    cookieName: 'MYSITECOOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);

const isPrivatePage = (url: string): boolean => {
  const privatePages = ['/dashboard'];

  return privatePages.includes(url);
};
