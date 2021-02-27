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
    this.store = window.localStorage;
    this.preFilter = null;
  }

  async query(method, path, body = null) {
    const response = await fetch(this.URL + path, {
      method,
      body,
    });

    return response;
  }

  addEvent(eventObj) {
    const events = this.getAllEvents();

    events.push(eventObj);

    this.save('events', JSON.stringify(events));
  }

  async getAllEvents() {
    let response = null;
    try {
      const reqUsers = await this.query('GET', '/events');
      if (!reqUsers.ok) throw new Error();

      response = await reqUsers.json();
    } catch (error) {
      return false;
    }
    return formatData(response);
  }

  async getPreFilteredEvents() {
    if (!this.preFilter) return this.getAllEvents();
    return this.getAllEvents().filter((el) => this.preFilter(el));
  }

  getEventByDayTime(day, time) {
    return this.getAllEvents()
      .find((event) => event.day === day && event.time === time);
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

  removeEvent(callback) {
    const events = this.getAllEvents();
    const removeIndex = events.findIndex((el) => callback(el));

    if (removeIndex === -1) return;

    events.splice(removeIndex, 1);

    this.save('events', JSON.stringify(events));
  }
}

const store = new Storage();

export default store;
