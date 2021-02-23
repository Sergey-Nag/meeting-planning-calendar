import store from './localStorageApi';
import placeAllEvents from './calendar';
import DATA from './_data';

const { users } = DATA;

const optionUsersInput = document.getElementById('filterUsers');

function placeNamesIntoSelect() {
  const usersOptionsItemsHTML = users.map(({ name }) => `<option>${name}</option>`).join('');

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

export default placeNamesIntoSelect;
