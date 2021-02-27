function formatData(dataArr) {
  return dataArr?.map(({ id, data }) => ({
    id, data: JSON.parse(data),
  }));
}

class Storage {
  SYSTEM = 'sergey_nagorniy';

  URL = `http://158.101.166.74:8080/api/data/${this.SYSTEM}`;

  constructor() {
    this.events = null;
    this.preFilter = null;
  }

  async query(method, path, body = null) {
    let response = null;

    try {
      const request = await fetch(this.URL + path, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = method === 'DELETE' ? null : await request.json();
      response = { ok: request.ok, data };
    } catch (e) {
      response = { ok: false, error: e };
    }
    console.count('Query');
    return response;
  }

  async setEvent(eventObj) {
    const data = { data: JSON.stringify(eventObj) };

    const reqSaveEvent = await this.query('POST', '/events', JSON.stringify(data));
    if (!reqSaveEvent.ok) return false;

    return reqSaveEvent.data;
  }

  async getAllEvents() {
    const reqEvents = await this.query('GET', '/events');
    if (!reqEvents.ok) return false;

    this.events = reqEvents.data === null ? [] : await formatData(reqEvents.data);
    return this.events;
  }

  async getPreFilteredEvents() {
    if (!this.preFilter) return this.getAllEvents();
    return this.events.filter(({ data }) => this.preFilter(data));
  }

  getEventByDayTime(day, time) {
    return this.events.some(({ data }) => data.day === day && data.time === time);
  }

  async updateEvent(eventId, day, time) {
    const eventToUpdate = this.events.find(({ id }) => id === eventId).data;
    eventToUpdate.day = day;
    eventToUpdate.time = time;

    const data = {
      data: JSON.stringify(eventToUpdate),
    };

    const reqUpdate = await this.query('PUT', `/events/${eventId}`, JSON.stringify(data));

    if (!reqUpdate.ok) return false;
    console.log(reqUpdate);
    return reqUpdate.data;
  }

  filterEvents(callback) {
    return this.getAllEvents()
      .filter((el) => callback(el));
  }

  async removeEvent(eventId) {
    const reqRemove = await this.query('DELETE', `/events/${eventId}`);
    return reqRemove.ok;
  }
}

const store = new Storage();

export default store;
