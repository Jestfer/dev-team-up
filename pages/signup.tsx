import Link from 'next/link';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import NavBar from '../components/navbar';
import { sessionChecker } from '../lib/auth/sessionChecker';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [language, setLanguage] = useState();

  // TODO: add some sort of user notification (snack bar or something)
  const handleSubmit = async () => {
    await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username, language }),
    });
  };

  return (
    <>
      <NavBar></NavBar>

      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Create a new account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Input
                fluid
                icon="user outline"
                iconPosition="left"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Input>
              <Form.Input
                fluid
                icon="js"
                iconPosition="left"
                placeholder="Main Programming Language"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              ></Form.Input>

              <Button color="teal" fluid size="large">
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account?{' '}
            <Link href="/login">
              <a>Log In</a>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export const getServerSideProps = (ctx) => sessionChecker(ctx);

export default Signup;
