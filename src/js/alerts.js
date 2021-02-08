let currentAlertWrapp = null;

function removeAlert(callback) {
  if (!callback) {
    currentAlertWrapp.remove();
    return;
  }

  // eslint-disable-next-line consistent-return
  return () => {
    currentAlertWrapp.remove();
    callback();
  };
}

function createAlertHTML(text) {
  return `<div class="card alert bg-success text-white">${text}</div>`;
}

function createAlertDangerTopHTML(text) {
  return `<div class="container px-5">
    <div class="row">
      <div class="col-11">${text}</div>
      <div class="col-1">
        <butto id="danger-alert-close" type="button" class="btn-close btn-close-white float-right" aria-label="Close"></button>
      </div>
    </div>
  </div>`;
}

function createConfirmHTML(text) {
  return `<div class="alert bg-light">${text}<hr><div class="row">
    <div class="col-6"><button id="event-delete-no" type="button" class="btn btn-outline-danger w-100">No</button></div>
    <div class="col-6"><button id="event-delete-yes" type="button" class="btn btn-success w-100">Yes</button></div>
  </div>
</div>`;
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

    if (callbackClose) removeAlert(callbackClose)();
    else removeAlert();
  }, true);
}

export {
  showAlertFull, showAlertAtTop, showAlertConfirm, removeAlert,
};
