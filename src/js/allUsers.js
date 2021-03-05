import User from './User';
import Admin from './Admin';
import Storage from './DatabaseApi';
import NotifyResponse from './DatabaseDecorator';
import EventEmmiter from './EventEmitter';

const events = EventEmmiter.getInstance();

const storageInstance = Storage.getInstance();
const store = new NotifyResponse(storageInstance);

export const data = {
  users: [],
};

function returnCreatedUser(id, { name, avatar, isAdmin }) {
  return isAdmin ? new Admin(id, name, avatar) : new User(id, name, avatar);
}

export default async function loadUsers() {
  if (data.users.length === 0) {
    const users = await store.getAllUsers();

    if (!users) return false;

    data.users = users
      .map(({ id, data: D }) => returnCreatedUser(id, JSON.parse(D)));

    events.emit('users-loaded', data.users);
  }

  return data.users;
}

export function getUserInfo(name) {
  return data.users.find((user) => user.name === name);
}
