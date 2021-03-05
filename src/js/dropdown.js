import Storage from './DatabaseApi';
import EventEmmiter from './EventEmitter';

const events = EventEmmiter.getInstance();

const store = Storage.getInstance();

const optionUsersInput = document.getElementById('filterUsers');

export function createOptionsWithNamesHTML(users) {
  return users.map(({ name }) => `<option>${name}</option>`).join('');
}

export default function placeNamesIntoSelect(users) {
  const usersOptionsItemsHTML = createOptionsWithNamesHTML(users);

  optionUsersInput.innerHTML = `<option value selected>All members</option>${usersOptionsItemsHTML}`;
}

function changeHandle() {
  const { value } = this;

  if (value !== '') store.preFilter = ({ participants }) => participants.includes(value);
  else store.preFilter = null;

  events.emit('update-events');
}

optionUsersInput.addEventListener('change', changeHandle);
events.on('users-loaded', placeNamesIntoSelect);
