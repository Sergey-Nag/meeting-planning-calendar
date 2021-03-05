import '@babel/polyfill';
import './base-import';
import './js/deleteEvents';
import './js/drag-n-drop';
import './js/dropdown';

import isUserAdmin, { returnOptionsWidthNamesHTML, setNewUser } from './js/userAccess';
import { showAuthoriseConfirm, removeAlert } from './js/alerts';
import EventEmmiter from './js/EventEmitter';
import loadUsers from './js/allUsers';

const events = EventEmmiter.getInstance();

function openAuthorization(users) {
  showAuthoriseConfirm(returnOptionsWidthNamesHTML(users), (chosenUser) => {
    if (isUserAdmin(chosenUser)) {
      document.body.classList.add('admin');
    }

    // placeNamesIntoSelect();
    setNewUser(chosenUser);
    removeAlert();

    events.emit('authorized');
  });
}

loadUsers();
events.on('users-loaded', openAuthorization);
