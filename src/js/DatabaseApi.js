function formatData(dataArr) {
  return dataArr?.map(({ id, data }) => ({
    id,
    data: JSON.parse(data)
  }));
}

class Storage {
  SYSTEM = 'sergey_nagorniy';

  URL = `http://158.101.166.74:8080/api/data/${this.SYSTEM}`;

  static instance = null;

  static getInstance() {
    Storage.instance = Storage.instance ?? new Storage();

    return Storage.instance;
  }

  constructor() {
    this.events = null;
    this.preFilter = null;
  }

  async query(method, path, body = null) {
    const request = await fetch(this.URL + path, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = method === 'DELETE' ? null : await request.json();

    return { ok: request.ok, data };
  }

  async setEvent(eventObj) {
    const data = { data: JSON.stringify(eventObj) };

    const reqSaveEvent = await this.query(
      'POST',
      '/events',
      JSON.stringify(data)
    );
    if (!reqSaveEvent.ok) return false;

    return reqSaveEvent.data;
  }

  async getAllEvents() {
    const { ok, data } = await this.query('GET', '/events');
    if (!ok) return false;

    this.events = data === null ? [] : await formatData(data);
    return this.events;
  }

  async getAllUsers() {
    const { ok, data } = await this.query('GET', '/users');
    if (!ok || !data) throw new Error();
    return data;
  }

  async getPreFilteredEvents() {
    if (!this.preFilter) return this.getAllEvents();
    return this.events.filter(({ data }) => this.preFilter(data));
  }

  getEventByDayTime(day, time) {
    return this.events.some(
      ({ data }) => data.day === day && data.time === time
    );
  }

  async updateEvent(eventId, day, time) {
    const eventToUpdate = this.events.find(({ id }) => id === eventId).data;
    eventToUpdate.day = day;
    eventToUpdate.time = time;

    const data = {
      data: JSON.stringify(eventToUpdate)
    };

    const reqUpdate = await this.query(
      'PUT',
      `/events/${eventId}`,
      JSON.stringify(data)
    );
    return reqUpdate.ok;
  }

  filterEvents(callback) {
    return this.getAllEvents().filter((el) => callback(el));
  }

  async removeEvent(eventId) {
    const reqRemove = await this.query('DELETE', `/events/${eventId}`);
    return reqRemove.ok;
  }
}

export default Storage;
