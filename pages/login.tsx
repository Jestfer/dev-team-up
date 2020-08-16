import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import NavBar from '../components/navbar';
import UserContext from '../components/user-context';
import { sessionChecker } from '../lib/auth/sessionChecker';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // TODO: rename => isLoggedIn, it's not really a user
  let { setUser } = useContext(UserContext);

  const handleSubmit = async () => {
    const response = await fetch('/api/auth/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setUser(true);
      // TODO: this is an issue, state (user context) is lost when navigating from Login
      return router.push('/dashboard');
    }
  };

  return (
    <>
      <NavBar></NavBar>

      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log in to your account
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

              <Button color="teal" fluid size="large" type="submit">
                Log In
              </Button>
            </Segment>
          </Form>
          <Message>
            New here?{' '}
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export const getServerSideProps = (ctx) => sessionChecker(ctx);

export default Login;
