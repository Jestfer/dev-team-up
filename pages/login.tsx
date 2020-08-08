import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import NavBar from '../components/navbar';
import UserContext from '../components/user-context';

const Login = () => {
  const router = useRouter();

  let { setUser } = useContext(UserContext);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    const response = await fetch('/api/auth/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setUser(true);
      return router.push('/dashboard');
    }
  };

  return (
    <>
      <NavBar></NavBar>

      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Head>
          <title>Dev Team Up</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        </Head>

        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              {/* Cannot use Form.Input, it wraps elements in a functional components that does not expose ref */}
              {/* <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" ref={emailInput} /> */}
              {/* <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                ref={passwordInput}
              /> */}
              <Form.Field>
                <input ref={emailInput} placeholder="E-mail address" />
              </Form.Field>
              <Form.Field>
                <input ref={passwordInput} placeholder="Password" />
              </Form.Field>

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

export default Login;
