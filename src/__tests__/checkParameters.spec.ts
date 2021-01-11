import Client from '../internal';

test('Dummy unit test', () => {
  it('should throw an error', () => {
    expect(Client.checkParameters()).toThrowError('my error');
  });
});
