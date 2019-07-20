import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from '../components/user-context';
import Header from '../components/header';


export default class AppContainer extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      userEmail: process.browser
        ? localStorage.getItem('userEmail')
        : ctx.req.session.email,
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : null,
    };
  }

  // All user values
  state = { email: null };

  componentDidMount() {
    const email = localStorage.getItem('email');
    if (email) this.setState({ email });
  }

  render() {
    const { Component, userEmail, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>mpaste</title>
        </Head>
        <UserContext.Provider value={this.state}>
          <Header userEmail={userEmail} />
          <Component {...pageProps} />
        </UserContext.Provider>
      </Container>
    );
  }
}
