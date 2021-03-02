import Admin from './Admin';
import { showPopup } from './alerts';
import loadUsers, { getUserInfo } from './allUsers';

let users = null;
export const authUser = {
  name: null,
};

async function getUsers() {
  users = await loadUsers();

  if (users) showPopup('success', '<i class="bi font-icon bi-cloud-check"></i> Users successfully loaded');
  else showPopup('danger', '<i class="bi font-icon bi-cloud-slash-fill"></i> <b>Loading Users error</b>, please, try again');

  return users;
}

export default function isUserAdmin(name = authUser.name) {
  return getUserInfo(name) instanceof Admin;
}

export async function returnOptionsWidthNamesHTML() {
  users = await getUsers();
  if (!users) return false;

  return users.map(({ name }) => `<option>${name}</option>`).join('');
}

export function setNewUser(name) {
  authUser.name = name;
}
