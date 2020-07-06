import { Menu, Container, Image, Button } from 'semantic-ui-react';
import Link from 'next/link';

const NavBar = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as="a" header>
        <Image
          size="mini"
          src="/lore-ipsum-logo.jpg"
          style={{ marginRight: '1.5em' }}
        />
        Dev Team Up
      </Menu.Item>
      <Link href="/">
        <Menu.Item as="a">Home</Menu.Item>
      </Link>
      <Menu.Item position="right">
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
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;
