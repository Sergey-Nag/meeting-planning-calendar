import DATA, { getUserInfo } from './_data';
import Admin from './Admin';

export const authUser = {
  name: null,
};

export default function isUserAdmin(name = authUser.name) {
  return getUserInfo(name) instanceof Admin;
}

export function returnOptionsWidthNamesHTML() {
  return DATA.users.map(({ name }) => `<option>${name}</option>`).join('');
}

export function setNewUser(name) {
  authUser.name = name;
}
