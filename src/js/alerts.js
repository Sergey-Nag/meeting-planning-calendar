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

function createWrappElement(className) {
  const wrapp = document.createElement('div');
  wrapp.className = className;
  return wrapp;
}

function showAlertFull(text, timeToClose, callback) {
  const wrapp = createWrappElement('alert__wrapp');
  wrapp.innerHTML = createAlertHTML(text);

  document.body.prepend(wrapp);

  setTimeout(() => {
    wrapp.remove();
    callback();
  }, timeToClose);
}

function showAlertAtTop(text) {
  const wrapp = createWrappElement('alert top bg-danger text-white');
  wrapp.innerHTML = createAlertDangerTopHTML(text);

  document.body.prepend(wrapp);

  document.getElementById('danger-alert-close').addEventListener('click', () => {
    wrapp.remove();
  });
}

export { showAlertFull, showAlertAtTop };
