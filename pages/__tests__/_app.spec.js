import AppContainer from '../_app';


describe('getInitialProps', () => {
  const originalProcessBrowser = process.browser;

  afterEach(() => {
    process.browser = originalProcessBrowser;
    jest.resetAllMocks();
  });


  test('userEmail on client', async () => {
    process.browser = true;
    jest.spyOn(localStorage, 'getItem').mockReturnValue('hacker@evil.org');

    return AppContainer
      .getInitialProps({ Component: {} })
      .then(({ userEmail }) => {
        expect(userEmail).toEqual('hacker@evil.org');
        expect(localStorage.getItem).toHaveBeenCalled();
      });
  });


  test('userEmail on server', async () => {
    process.browser = false;
    jest.spyOn(localStorage, 'getItem');

    return AppContainer
      .getInitialProps({
        Component: {},
        ctx: {
          req: {
            session: { email: 'a@b.ca' },
          },
        },
      })
      .then(({ userEmail }) => {
        expect(userEmail).toEqual('a@b.ca');
        expect(localStorage.getItem).not.toHaveBeenCalled();
      });
  });


  test('pageProps with getInitialProps', async () => {
    const getInitialProps = jest.fn().mockReturnValue(Promise.resolve('ay'));

    return AppContainer
      .getInitialProps({
        Component: { getInitialProps },
        ctx: {
          req: {
            session: { email: 'a@b.ca' },
          },
        },
      })
      .then(({ pageProps }) => {
        expect(pageProps).toEqual('ay');
        expect(getInitialProps).toHaveBeenCalled();
      });
  });


  test('pageProps without getInitialProps', async () => AppContainer
    .getInitialProps({
      Component: {},
      ctx: {
        req: {
          session: { email: 'a@b.ca' },
        },
      },
    })
    .then(({ pageProps }) => {
      expect(pageProps).toBeNull();
    }));
});
