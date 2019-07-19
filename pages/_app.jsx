import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header';


export default class AppContainer extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : null,
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>mpaste</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </Container>
    );
  }
}
