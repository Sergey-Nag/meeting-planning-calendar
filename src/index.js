import "@babel/polyfill";
import "./base-import";
import "./js/calendar";
import "./js/deleteEvents";
import "./js/drag-n-drop";
import "./js/dropdown";

import { createOptionsWithNamesHTML } from "./js/_htmlElements";
import isUserAdmin, { setNewUser } from "./js/userAccess";
import { showAuthoriseConfirm, removeAlert } from "./js/alerts";
import EventEmmiter from "./js/EventEmitter";
import loadUsers from "./js/allUsers";

const events = EventEmmiter.getInstance();

function openAuthorization(users) {
  showAuthoriseConfirm(createOptionsWithNamesHTML(users), (chosenUser) => {
    if (isUserAdmin(chosenUser)) {
      document.body.classList.add("admin");
    }

    setNewUser(chosenUser);
    removeAlert();

    events.emit('authorized');
  });
}

events.on("users-loaded", openAuthorization);
loadUsers();
