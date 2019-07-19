import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
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
          <style jsx global>
            {`
              body {
                margin: 0;
                font-family: helvetica, arial, sans-serif;
              }
            `}
          </style>
        </Head>

        <Header />
        <Component {...pageProps} />
      </Container>
    );
  }
}
