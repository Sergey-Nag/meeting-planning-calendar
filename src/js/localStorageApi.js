import DATA from './_data';

class Storage {
  constructor() {
    this.store = window.localStorage;
    this.preFilter = null;
  }

  save(key, value) {
    this.store.setItem(key, value);
  }

  addEvent(eventObj) {
    const events = this.getAllEvents();

    events.push(eventObj);

    this.save('events', JSON.stringify(events));
  }

  getAllEvents() {
    return JSON.parse(this.store.getItem('events'));
  }

  getPreFilteredEvents() {
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

function createStartData(store) {
  if (store.store.users) store.store.removeItem('users');

  if (!store.store.events) store.save('events', JSON.stringify(DATA.events));
}

const store = new Storage();
createStartData(store);

export default store;
