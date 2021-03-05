import Admin from './Admin';
import { getUserInfo } from './allUsers';

export const authUser = {
  name: null,
};

export default function isUserAdmin(name = authUser.name) {
  return getUserInfo(name) instanceof Admin;
}

export function returnOptionsWidthNamesHTML(users) {
  return users.map(({ name }) => `<option>${name}</option>`).join('');
}

export function setNewUser(name) {
  authUser.name = name;
}
