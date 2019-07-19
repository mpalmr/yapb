import React from 'react';
import App, { Container } from 'next/app';
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
        <Header />
        <Component {...pageProps} />
      </Container>
    );
  }
}
