function dataStringToJSON(dataString) {
  const replacedQuotes = dataString.replace(/'/g, '"');
  return JSON.parse(replacedQuotes);
}

function formatData(dataArr) {
  return dataArr?.map(({ id, data }) => ({
    id, data: dataStringToJSON(data),
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

    return response;
  }

  async setEvent(eventObj) {
    const stringifyEvent = JSON.stringify(eventObj).replace(/"/g, '\'');
    const data = { data: stringifyEvent };

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

  async getEventByDayTime(day, time) {
    const dataArr = await this.getAllEvents();
    return dataArr?.find(({ data }) => data.day === day && data.time === time);
  }

  updateEvent({ find, changeData }) {
    const eventToUpdIndex = this.getAllEvents().findIndex(find);

    const copyEvents = [...this.getAllEvents()];
    const eventToUpd = copyEvents[eventToUpdIndex];

    Object.keys(changeData).forEach((key) => {
      eventToUpd[key] = changeData[key];
    });

    this.save('events', JSON.stringify(copyEvents));
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
