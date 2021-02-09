import { createAlertHTML, createAlertDangerTopHTML, createConfirmHTML } from './_htmlElements';

let currentAlertWrapp = null;

function removeAlert(callback) {
  currentAlertWrapp.remove();
  if (callback) callback();
}

function placeAlert() {
  document.body.prepend(currentAlertWrapp);
}

function createWrappElement(className = 'alert__wrapp') {
  currentAlertWrapp = document.createElement('div');
  currentAlertWrapp.className = className;
  return currentAlertWrapp;
}

function showAlertFull(text, timeToClose, callback) {
  currentAlertWrapp = createWrappElement();
  currentAlertWrapp.innerHTML = createAlertHTML(text);

  placeAlert();

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

  placeAlert();

  document.getElementById('danger-alert-close').addEventListener('click', () => {
    removeAlert();
  });
}

function showAlertConfirm(text, callbackTrue, callbackFalse, callbackClose = null) {
  currentAlertWrapp = createWrappElement();
  currentAlertWrapp.innerHTML = createConfirmHTML(text);

  placeAlert();

  document.getElementById('event-delete-yes').addEventListener('click', callbackTrue);
  document.getElementById('event-delete-no').addEventListener('click', callbackFalse);
  document.querySelector('.alert__wrapp').addEventListener('click', (e) => {
    if (e.target.className !== 'alert__wrapp') return;

    removeAlert(callbackClose);
  }, true);
}

export {
  showAlertFull, showAlertAtTop, showAlertConfirm, removeAlert,
};
