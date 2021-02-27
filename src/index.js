import '@babel/polyfill';
import './base-import';
import './js/dropdown';
import './js/deleteEvents';
import './js/drag-n-drop';

import isUserAdmin, { returnOptionsWidthNamesHTML, setNewUser } from './js/userAccess';
import { showAuthoriseConfirm, showPopup, removeAlert } from './js/alerts';
import placeAllEvents from './js/calendar';

showAuthoriseConfirm(returnOptionsWidthNamesHTML(), (chosenUser) => {
  if (isUserAdmin(chosenUser)) {
    document.body.classList.add('admin');
  }

  setNewUser(chosenUser);
  removeAlert();
  const isPlaced = placeAllEvents();

  if (isPlaced) showPopup('success', '<i class="bi bi-cloud-check"></i> Events successfully loaded');
  else showPopup('danger', '<i class="bi bi-cloud-slash-fill"></i> <b>Loading Events error</b>, please try again');
});
