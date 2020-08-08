import Link from 'next/link';
import { Container, Menu } from 'semantic-ui-react';
import NavButtons from './nav-buttons';

const NavBar = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as="a" header>
        Dev Team Up
      </Menu.Item>
      <Link href="/">
        <Menu.Item as="a">Home</Menu.Item>
      </Link>
      <Menu.Item position="right">
        <NavButtons></NavButtons>
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;
