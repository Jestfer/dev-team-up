import { withIronSession } from 'next-iron-session';

export const sessionChecker = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get('user');

    /*
      Return redirect from getServerSideProps, being discussed:
      https://github.com/vercel/next.js/discussions/11281

      Client-Side and Server-Side Redirects in Next.js:
      https://dev.to/justincy/client-side-and-server-side-redirection-in-next-js-3ile
    */
    if (!user) {
      res.statusCode = 404;
      res.end();
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  {
    cookieName: 'MYSITECOOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);
