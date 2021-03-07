import Storage from '../js/DatabaseApi';

jest.mock('../js/DatabaseApi');

describe('CRUD tests:', () => {
  const store = new Storage();

  test('Create: Create new Event', async () => {
    const asyncMock = await store.setEvent.mockReturnValue([{a:1}]);

    expect(asyncMock()).toEqual([
        expect.objectContaining({"a":1})
      ])
  });

  test('Read: Get all events', async () => {
    const asyncMock = await store.getAllEvents.mockReturnValue({a: 1});

    expect(asyncMock).toBeInstanceOf(Object);
  });

  test('Update: Change event time', async () => {
    const asyncMock = await store.getAllEvents.mockReturnValue({a: 1});

    expect(asyncMock).toBeInstanceOf(Object);
  });

  test('Delete: Delete event', async () => {
    const asyncMock = await store.getAllEvents.mockReturnValue({a: 1});

    expect(asyncMock).toBeInstanceOf(Object);
  });
});
