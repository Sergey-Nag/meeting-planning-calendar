import DATA from './_data';

class Storage {
  constructor() {
    this.store = window.localStorage;
  }

  save(key, value) {
    this.store.setItem(key, value);
  }

  setEvent(eventObj) {
    const events = this.getAllEvents();

    events.push(eventObj);

    this.save('events', JSON.stringify(events));
  }

  getAllEvents() {
    return JSON.parse(this.store.getItem('events'));
  }

  getAllUsers() {
    return JSON.parse(this.store.getItem('users'));
  }

  getUserInfo(name) {
    return this.getAllUsers().find((user) => user.name === name);
  }
}

function createStartData(store) {
  if (!store.store.users) store.save('users', JSON.stringify(DATA.users));

  if (!store.store.events) store.save('events', JSON.stringify(DATA.events));
}

const store = new Storage();
createStartData(store);

export default store;
