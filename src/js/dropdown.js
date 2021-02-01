import store from './calendar';

function createOptionHTML(name) {
  return `<option>${name}</option>`;
}

const users = store.getAllUsers();

const optionUsersInput = document.getElementById('filterUsers');

const usersOptionsItems = users.map((user) => createOptionHTML(user.name)).join('');

optionUsersInput.innerHTML += usersOptionsItems;
// const dropdownBtn = document.getElementById('dropdownFilterButton');
