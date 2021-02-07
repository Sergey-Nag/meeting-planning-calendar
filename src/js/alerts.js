function createAlertHTML(color, text) {
  return `<div class="card alert bg-${color} text-white">${text}</div>`;
}

function createWrappElement() {
  const wrapp = document.createElement('div');
  wrapp.className = 'alert__wrapp';
  return wrapp;
}

function showAlert(color, text, timeToClose, callback) {
  const wrapp = createWrappElement();
  wrapp.innerHTML = createAlertHTML(color, text);

  document.body.prepend(wrapp);

  setTimeout(() => {
    wrapp.remove();
    callback();
  }, timeToClose);
}

export default showAlert;
