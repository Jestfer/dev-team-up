import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';
import Head from 'next/head';
import NavBar from '../components/navbar';
import Link from 'next/link';

const Signup = () => (
  <>
    <NavBar></NavBar>

    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Head>
        <title>Dev Team Up</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>

      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image size="mini" src="/lore-ipsum-logo.jpg" /> Create a new account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            <Form.Input
              fluid
              icon="user outline"
              iconPosition="left"
              placeholder="Username"
              type="text"
            ></Form.Input>
            <Form.Input
              fluid
              icon="js"
              iconPosition="left"
              placeholder="Main Programming Language"
              type="text"
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

export default Signup;
