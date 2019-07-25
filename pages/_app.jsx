import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationsProvider from '../components/providers/notifications';
import UserProvider from '../components/providers/user';
import Header from '../components/header';
import Footer from '../components/footer';


export default class AppContainer extends App {
  static propTypes = {
    Component: PropTypes.func.isRequired,
    userId: PropTypes.string,
    userEmail: PropTypes.string,
    pageProps: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    userId: null,
    userEmail: null,
    pageProps: null,
  };

  static async getInitialProps({ Component, ctx }) {
    return {
      userId: process.browser ? localStorage.getItem('userId') : ctx.req.session.uuid,
      userEmail: process.browser ? localStorage.getItem('userEmail') : ctx.req.session.email,
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : null,
    };
  }

  render() {
    const {
      Component,
      userId,
      userEmail,
      pageProps,
    } = this.props;

    return (
      <Container>
        <Head>
          <title>mpaste</title>
        </Head>

        <NotificationsProvider>
          <UserProvider id={userId} email={userEmail}>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
          </UserProvider>
        </NotificationsProvider>

        <Footer />
      </Container>
    );
  }
}
