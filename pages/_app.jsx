import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from '../components/providers/user';
import Header from '../components/header';
import Footer from '../components/footer';


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

  render() {
    const { Component, userEmail, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>mpaste</title>
        </Head>
        <UserProvider email={userEmail}>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </UserProvider>
        <Footer />
      </Container>
    );
  }
}
