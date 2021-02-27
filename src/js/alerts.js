import {
  createAlertHTML,
  createAlertDangerTopHTML,
  createConfirmHTML,
  createAuthoriseConfirmHTML,
  createPopUpHTML,
} from './_htmlElements';

let currentAlertWrapp = null;
let currentPopup = null;
const popupsArr = [];
let removePopupsInterval = null;

function removeAlert(callback) {
  currentAlertWrapp.remove();
  if (callback) callback();
}

function placeAlert(alert) {
  document.body.prepend(alert);
}

function createWrappElement(className = 'alert__wrapp') {
  const wrapp = document.createElement('div');
  wrapp.className = className;
  return wrapp;
}

function showAlertFull(text, timeToClose, callback) {
  currentAlertWrapp = createWrappElement();
  currentAlertWrapp.innerHTML = createAlertHTML(text);

  placeAlert(currentAlertWrapp);

  setTimeout(() => {
    removeAlert();
    callback();
  }, timeToClose);
}

function showAlertAtTop(text) {
  const oldAlert = document.querySelector('.alert');
  if (oldAlert) oldAlert.remove();

  currentAlertWrapp = createWrappElement('alert top bg-danger text-white');
  currentAlertWrapp.innerHTML = createAlertDangerTopHTML(text);

  placeAlert(currentAlertWrapp);

  document.getElementById('danger-alert-close').addEventListener('click', () => {
    removeAlert();
  });
}

function showAlertConfirm(text, callbackTrue, callbackFalse, callbackClose = null) {
  currentAlertWrapp = createWrappElement();
  currentAlertWrapp.innerHTML = createConfirmHTML(text);

  placeAlert(currentAlertWrapp);

  document.getElementById('event-delete-yes').addEventListener('click', callbackTrue);
  document.getElementById('event-delete-no').addEventListener('click', callbackFalse);
  document.querySelector('.alert__wrapp').addEventListener('click', (e) => {
    if (e.target.className !== 'alert__wrapp') return;

    removeAlert(callbackClose);
  }, true);
}

async function showAuthoriseConfirm(optionsWithNames, callbackTrue) {
  currentAlertWrapp = createWrappElement();
  currentAlertWrapp.innerHTML = createAuthoriseConfirmHTML(await optionsWithNames);

  placeAlert(currentAlertWrapp);

  document.getElementById('authorise-btn').addEventListener('click', () => {
    const chosenUser = document.getElementById('auth-names').value;
    callbackTrue(chosenUser);
  });
}

function placePopupWrapp() {
  if (!currentPopup) {
    currentPopup = createWrappElement('popup__wrapp');
    placeAlert(currentPopup);
  }
}

function drawPopups() {
  currentPopup.innerHTML = popupsArr
    .map(({ theme, title }) => createPopUpHTML(theme, title)).join('');
}

function stopRemovingPopups() {
  clearInterval(removePopupsInterval);
  removePopupsInterval = null;
}

function removeItems() {
  if (removePopupsInterval !== null) return;

  removePopupsInterval = setInterval(() => {
    const index = popupsArr.findIndex(({ created }) => created < Date.now() - 3000);

    if (index !== -1) {
      popupsArr.splice(index, 1);
      drawPopups();
    }

    if (popupsArr.length === 0) stopRemovingPopups();
  }, 3000);
}

function showPopup(theme, title) {
  placePopupWrapp();

  popupsArr.push({ theme, title, created: Date.now() });

  drawPopups();
  removeItems();
}

export {
  showAlertFull, showAlertAtTop, showAlertConfirm, showAuthoriseConfirm, showPopup, removeAlert,
};
