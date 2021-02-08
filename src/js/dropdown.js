import store from './localStorageApi';
import placeAllEvents from './calendar';

const users = store.getAllUsers();

const optionUsersInput = document.getElementById('filterUsers');

const usersOptionsItems = users.map(({ name }) => `<option>${name}</option>`).join('');

optionUsersInput.innerHTML += usersOptionsItems;

function changeHandle() {
  const { value } = this;
  let events = null;

  if (value !== '') {
    events = store.filterEvents(({ participants }) => participants.includes(value));
  }

  placeAllEvents(events);
}

optionUsersInput.addEventListener('change', changeHandle);
