import DATA, { getUserInfo } from './_data';
import Admin from './Admin';
import { showAuthoriseConfirm, removeAlert } from './alerts';

export const authUser = {
  name: null,
};

export default function isUserAdmin(name = authUser.name) {
  return getUserInfo(name) instanceof Admin;
}

function returnOptionsWidthNamesHTML() {
  return DATA.users.map(({ name }) => `<option>${name}</option>`).join('');
}

showAuthoriseConfirm(returnOptionsWidthNamesHTML(), (chosenUser) => {
  if (isUserAdmin(chosenUser)) {
    document.body.classList.add('admin');
  }

  authUser.name = chosenUser;
  removeAlert();
});
