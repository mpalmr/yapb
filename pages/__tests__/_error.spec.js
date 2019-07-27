import ErrorPage from '../_error';


beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  process.browser = undefined;
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});


describe('getInitialProps', () => {
  test('Server side 404', () => {
    const err = new Error('mockError');
    expect(ErrorPage.getInitialProps({
      err,
      res: { statusCode: 404 },
    }))
      .toEqual({ message: 'resource not found' });
    expect(console.error).toBeCalledWith(err);
  });


  test('Server side unkonwn', () => {
    const err = new Error('mockError');
    expect(ErrorPage.getInitialProps({
      err,
      res: { statusCode: 101 },
    }))
      .toEqual({ message: undefined });
    expect(console.error).toBeCalledWith(err);
  });


  test('Client', () => {
    const err = new Error('mockError');
    process.browser = true;
    expect(ErrorPage.getInitialProps({
      err,
      res: { statusCode: 101 },
    }))
      .toEqual({ message: undefined });
    expect(console.error).toBeCalledWith(err);
  });
});
