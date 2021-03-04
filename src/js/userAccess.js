import Admin from './Admin';
import loadUsers, { getUserInfo } from './allUsers';

let users = null;
export const authUser = {
  name: null,
};

export default function isUserAdmin(name = authUser.name) {
  return getUserInfo(name) instanceof Admin;
}

export async function returnOptionsWidthNamesHTML() {
  users = await loadUsers();
  if (!users) return false;

  return users.map(({ name }) => `<option>${name}</option>`).join('');
}

export function setNewUser(name) {
  authUser.name = name;
}
