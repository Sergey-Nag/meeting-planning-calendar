import DATA, { getUserInfo } from './_data';
import Admin from './Admin';
import { showAuthoriseConfirm, removeAlert } from './alerts';
import { getAuthorisedUser, authoriseUser } from './authByCookies';
// const authorizedUsername = 'Alex';

export default function isUserAdmin(name) {
  return getUserInfo(name) instanceof Admin;
}

function returnOptionsWidthNamesHTML() {
  return DATA.users.map(({ name }) => `<option>${name}</option>`).join('');
}

showAuthoriseConfirm(returnOptionsWidthNamesHTML(), (chosenUser) => {
  if (isUserAdmin(chosenUser)) {
    const createEventBtnWrapp = document.getElementById('create-event-btn-wrapp');

    if (createEventBtnWrapp) createEventBtnWrapp.style.display = 'block';
  }
  console.log(getAuthorisedUser());
  authoriseUser(chosenUser);
  console.log(getAuthorisedUser());

  removeAlert();
});
