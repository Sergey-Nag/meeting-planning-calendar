export default class EventEmmiter {
  static instance = null;

  static getInstance() {
    EventEmmiter.instance = EventEmmiter.instance ?? new EventEmmiter();

    return EventEmmiter.instance;
  }

  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  remove(event, callback) {
    if (typeof this.events[event] !== 'object') return;

    const index = this.events[event].indexOf(callback);

    if (index !== -1) this.events[event].splice(index, 1);
  }

  emit(event, ...args) {
    if (typeof this.events[event] !== 'object') return;

    this.events[event].forEach((callback) => callback.apply(this, args));
  }
}
