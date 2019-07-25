import PasteIdPage from '../[id]';
import client from '../../../client';


afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});


describe('getInitialProps', () => {
  afterEach(() => {
    process.browser = undefined;
  });


  test('server', async () => PasteIdPage.getInitialProps({
    query: { id: 'mockId' },
    res: {
      locals: { paste: 'mockPaste' },
    },
  })
    .then((paste) => {
      expect(paste).toBe('mockPaste');
    }));


  test('client', async () => {
    jest.spyOn(client, 'get').mockResolvedValue('mockRes');
    process.browser = true;

    return PasteIdPage.getInitialProps({
      query: { id: 'mockId' },
      res: {
        locals: { paste: 'mockPaste' },
      },
    })
      .then((paste) => {
        expect(paste).toBe('mockRes');
        expect(client.get).toBeCalledWith('/paste/mockId');
      });
  });
});
