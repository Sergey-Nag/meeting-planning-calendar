import store from './DatabaseApi';
import { showAlertConfirm, showAlertAtTop, removeAlert } from './alerts';
import placeAllEvents from './calendar';

async function removeEvent(id) {
  const isDone = await store.removeEvent(id);
  return isDone;
}

document.getElementById('calendar').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-close');

  if (!btn) return;

  const eventTitle = btn.closest('.card').querySelector('.card__title').textContent;

  showAlertConfirm(`Are you sure you want to delete "${eventTitle}" event?`,
    async () => {
      const isEventRemoved = await removeEvent(btn.dataset.id);
      removeAlert();

      if (!isEventRemoved) {
        showAlertAtTop('Something wrong, <b>event wasn\'t deleted</b>, please try again');
      } else {
        placeAllEvents();
      }
    }, () => removeAlert());
});
