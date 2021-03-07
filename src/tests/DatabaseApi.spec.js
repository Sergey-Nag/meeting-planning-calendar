import Storage from '../js/DatabaseApi';
import toBeArrayAndLengthToBeGreaterThan from './testArray';

jest.mock('../js/DatabaseApi');

describe('CRUD tests:', () => {
  expect.extend({
    toBeArrayAndLengthToBeGreaterThan,
  });

  let store;

  beforeAll(() => {
    store = new Storage();
  });

  test('Create: Create new event and return him with new id', async () => {
    const mockData = await store.setEvent.mockReturnValue({
      id: 'c313ebb5-968c-4d0c-b910-127d0adcfed2',
      data: '{"day":"Tue","participants":["Elizabeth"],"time":"10:00","title":"one more"}',
    });

    const gotMockData = mockData();

    expect(mockData).toHaveReturned();
    expect(gotMockData).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        data: expect.any(String),
      }),
    );
  });

  test('Read: Get all events with their id', async () => {
    const mockData = await store.getAllEvents.mockReturnValue([{
      data: {
        day: 'Tue',
        participants: ['Elizabeth'],
        time: '10:00',
        title: 'Test',
      },
      id: '9fb6be56-e54d-4db9-b827-a04424985e72',
    }]);

    const gotMockData = mockData();

    expect(mockData).toHaveReturned();

    for (let i = 0; i < gotMockData.length; i += 1) {
      expect(gotMockData[i]).toEqual({
        id: expect.any(String),
        data: expect.objectContaining({
          day: expect.any(String),
          participants: expect.toBeArrayAndLengthToBeGreaterThan(0),
          time: expect.any(String),
          title: expect.any(String),
        }),
      });
    }
  });

  test('Read: Get all users with their id', async () => {
    const mockData = await store.getAllUsers.mockReturnValue([{
      id: 'c313ebb5-968c-4d0c-b910-127d0adcfed2',
      data: '{"name":"Elizabeth","avatar":"girl_1.png","isAdmin":true}',
    },
    {
      id: '8f851863-6ddc-4e30-a2fc-800efddbb5e8',
      data: '{"name":"Steve","avatar":"boy_2.png","isAdmin":false}',
    },
    {
      id: '4d0cc0c3-238e-47ef-93fd-e38839ed5ff6',
      data: '{"name":"Ann","avatar":"girl_2.png","isAdmin":false}',
    },
    {
      id: 'b2b70b62-35c8-4ae4-ac91-83ce415ccec4',
      data: '{"name":"Maria","avatar":"girl_3.png","isAdmin":false}',
    },
    {
      id: 'f28a3cce-8e21-48cf-ad76-30da9e6ad79c',
      data: '{"name":"Bob","avatar":"boy_3.png","isAdmin":false}',
    },
    {
      id: '40cdf5c6-8736-41e4-8522-7f836559ed01',
      data: '{"name":"Alex","avatar":"boy_1.png","isAdmin":true}',
    }]);

    const gotMockData = mockData();

    expect(mockData).toHaveReturned();
    expect(gotMockData).toBeArrayAndLengthToBeGreaterThan(0);

    for (let i = 0; i < gotMockData.length; i += 1) {
      expect(gotMockData[i]).toEqual({
        id: expect.any(String),
        data: expect.any(String),
      });
    }
  });

  test('Update: Change event date and time', async () => {
    const mockData = await store.updateEvent.mockReturnValue(true);

    const gotMockData = mockData();

    expect(mockData).toHaveReturned();
    expect(gotMockData).toBeTruthy();
  });

  test('Delete: Delete event', async () => {
    const mockData = await store.removeEvent.mockReturnValue(true);

    const gotMockData = mockData();

    expect(mockData).toHaveReturned();
    expect(gotMockData).toBeTruthy();
  });
});
