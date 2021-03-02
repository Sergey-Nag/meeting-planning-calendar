import User from './User';
import Admin from './Admin';
import Storage from './DatabaseApi';

const store = Storage.getInstance();

export const data = {
  users: [],
};

function returnCreatedUsers(id, { name, avatar, isAdmin }) {
  return isAdmin ? new Admin(id, name, avatar) : new User(id, name, avatar);
}

export default async function loadUsers() {
  if (data.users.length === 0) {
    const users = await store.getAllUsers();

    if (!users) return false;

    data.users = users
      .map(({ id, data: D }) => returnCreatedUsers(id, JSON.parse(D)));
  }

  return Promise.resolve(data.users);
}

export function getUserInfo(name) {
  return data.users.find((user) => user.name === name);
}
