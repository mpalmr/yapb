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
    Component: PropTypes.element.isRequired,
    userEmail: PropTypes.string,
    pageProps: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    userEmail: null,
    pageProps: null,
  };

  static async getInitialProps({ Component, ctx }) {
    return {
      userEmail: process.browser ? null : ctx.req.session.email,
      pageProps: Component.getInitialProps && await Component.getInitialProps(ctx),
    };
  }

  render() {
    const { Component, ...props } = this.props;

    return (
      <Container>
        <Head>
          <title>mpaste</title>
        </Head>

        <NotificationsProvider>
          <UserProvider email={props.userEmail}>
            <Header />
            <main>
              <Component {...props.pageProps} />
            </main>
          </UserProvider>
        </NotificationsProvider>

        <Footer />
      </Container>
    );
  }
}
