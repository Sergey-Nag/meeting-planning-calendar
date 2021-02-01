import DATA from './_data';

export default class Storage {
  constructor() {
    this.store = window.localStorage;
  }

  save(key, value) {
    this.store.setItem(key, value);
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

function createStartData() {
  const testStorage = new Storage();

  if (!testStorage.store.users) testStorage.save('users', JSON.stringify(DATA.users));

  if (!testStorage.store.events) testStorage.save('events', JSON.stringify(DATA.events));
}

createStartData();
