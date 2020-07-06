import React from 'react';
import { Menu, Container, Image, Button } from 'semantic-ui-react';

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
      <Menu.Item as="a">Home</Menu.Item>
      <Menu.Item position="right">
        <Button as="a" inverted>
          Log in
        </Button>
        <Button as="a" inverted primary style={{ marginLeft: '0.5em' }}>
          Sign Up
        </Button>
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;
