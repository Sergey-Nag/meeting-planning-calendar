import { showPopup } from './alerts';
import Storage from './DatabaseApi';

class NotifierQueryStorage extends Storage {
  constructor(storage) {
    super();

    this.storage = storage;
  }

  async getAllUsers() {
    const users = await this.storage.getAllUsers();
    return users;
  }

  async getPreFilteredEvents() {
    const events = await this.storage.getAllEvents();
    return events;
  }
}

export default class NotifyResponse extends NotifierQueryStorage {
  async getAllUsers() {
    let users = null;

    try {
      users = await super.getAllUsers();

      if (users) showPopup('success', '<i class="bi font-icon bi-cloud-check"></i> Users successfully loaded');
      else throw new Error();
    } catch (e) {
      showPopup('danger', '<i class="bi font-icon bi-cloud-slash-fill"></i> <b>Loading Users error</b>, please, try again');
    }

    return users;
  }

  async getPreFilteredEvents() {
    let events = null;

    try {
      events = await super.getAllEvents();

      if (events.length === 0) showPopup('warning', '<i class="bi font-icon bi-cloud-check"></i> Not enough events to display');
      else if (events) showPopup('success', '<i class="bi font-icon bi-cloud-check"></i> Events successfully loaded');
      else throw new Error();
    } catch (e) {
      showPopup('danger', '<i class="bi font-icon bi-cloud-slash-fill"></i> <b>Loading Events error</b>, please, try again');
    }

    return events;
  }
}
