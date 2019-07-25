import AppContainer from '../_app';


describe('getInitialProps', () => {
  const originalProcessBrowser = process.browser;

  afterEach(() => {
    process.browser = originalProcessBrowser;
    jest.resetAllMocks();
  });


  test('userEmail on client', async () => {
    process.browser = true;
    return AppContainer
      .getInitialProps({ Component: {} })
      .then(({ userEmail }) => {
        expect(userEmail).toBeNull();
      });
  });


  test('userEmail on server', async () => {
    process.browser = false;

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
});
