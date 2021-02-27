import store from './DatabaseApi';
import placeAllEvents from './calendar';
import loadUsers from './allUsers';

const optionUsersInput = document.getElementById('filterUsers');

export async function createOptionsWithNamesHTML() {
  const usrs = await loadUsers();
  if (!usrs) return false;

  return usrs.map(({ name }) => `<option>${name}</option>`).join('');
}

export default async function placeNamesIntoSelect() {
  const usersOptionsItemsHTML = await createOptionsWithNamesHTML();

  optionUsersInput.innerHTML = `<option value selected>All members</option>${usersOptionsItemsHTML}`;
}

function changeHandle() {
  const { value } = this;

  if (value !== '') store.preFilter = ({ participants }) => participants.includes(value);
  else store.preFilter = null;

  placeAllEvents();
}

optionUsersInput.addEventListener('change', changeHandle);
placeNamesIntoSelect();
