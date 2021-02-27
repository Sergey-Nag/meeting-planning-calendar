import store from './DatabaseApi';
import placeAllEvents from './calendar';
import DATA from './_data';

const { users } = DATA;

const optionUsersInput = document.getElementById('filterUsers');

export function createOptionsWithNamesHTML() {
  return users.map(({ name }) => `<option>${name}</option>`).join('');
}

export default function placeNamesIntoSelect() {
  const usersOptionsItemsHTML = createOptionsWithNamesHTML();

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
