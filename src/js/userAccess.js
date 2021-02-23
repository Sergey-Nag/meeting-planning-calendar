import DATA, { getUserInfo } from './_data';
import Admin from './Admin';
import { showAuthoriseConfirm } from './alerts';

const authorizedUsername = 'Alex';

export default function isUserAdmin(name) {
  return getUserInfo(name) instanceof Admin;
}

function returnOptionsWidthNamesHTML() {
  return DATA.users.map(({ name }) => `<option>${name}</option>`).join('');
}

showAuthoriseConfirm(returnOptionsWidthNamesHTML(), (chosenUser) => {
  console.log(chosenUser);
});

if (isUserAdmin(authorizedUsername)) {
  const createEventBtnWrapp = document.getElementById('create-event-btn-wrapp');

  if (createEventBtnWrapp) createEventBtnWrapp.style.display = 'block';
} else if (window.location.pathname === '/create-event.html') {
  window.location.pathname = '/index.html';
}
