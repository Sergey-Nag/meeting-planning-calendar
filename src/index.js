import '@babel/polyfill';
import './base-import';
import './js/deleteEvents';
import './js/drag-n-drop';

import isUserAdmin, { returnOptionsWidthNamesHTML, setNewUser } from './js/userAccess';
import { showAuthoriseConfirm, removeAlert } from './js/alerts';
import placeAllEvents from './js/calendar';
import placeNamesIntoSelect from './js/dropdown';

showAuthoriseConfirm(returnOptionsWidthNamesHTML(), async (chosenUser) => {
  if (isUserAdmin(chosenUser)) {
    document.body.classList.add('admin');
  }

  setNewUser(chosenUser);
  removeAlert();
  await placeAllEvents();
  placeNamesIntoSelect();
});
