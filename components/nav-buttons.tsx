import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import Task from './task';
import { useContext } from 'react';
import UserContext from './user-context';
import { useRouter } from 'next/router';

const NavButtons = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/auth/sessions', {
      method: 'DELETE',
    });

    if (response.ok) {
      setUser(null);
      return router.push('/');
    }
  };

  if (user) {
    return (
      <>
        <Task></Task>
        <Button inverted onClick={handleLogout}>
          Log out
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Link href="/login">
          <Button as="a" inverted>
            Log in
          </Button>
        </Link>
        {/* TODO: check image resizing flickering for a sec */}
        <Link href="/signup">
          <Button as="a" inverted primary style={{ marginLeft: '0.5em' }}>
            Sign Up
          </Button>
        </Link>
      </>
    );
  }
};

export default NavButtons;
