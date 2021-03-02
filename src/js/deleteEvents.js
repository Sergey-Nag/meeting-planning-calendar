import Storage from './DatabaseApi';
import placeAllEvents from './calendar';
import {
  showAlertConfirm,
  showPopup,
  removeAlert,
} from './alerts';

const store = Storage.getInstance();

async function removeEvent(id) {
  const isDone = await store.removeEvent(id);
  return isDone;
}

document.getElementById('calendar').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-close');

  if (!btn) return;

  const eventCard = btn.closest('.card');
  const eventTitle = eventCard.querySelector('.card__title').textContent;

  showAlertConfirm(`Are you sure you want to delete "${eventTitle}" event?`,
    async () => {
      const isEventRemoved = await removeEvent(eventCard.dataset.id);
      removeAlert();

      if (!isEventRemoved) {
        showPopup('danger', '<i class="bi font-icon bi-trash-fill"></i> <b>Deleting Events error</b>, please try again');
      } else {
        placeAllEvents();
        showPopup('success', '<i class="bi font-icon bi-trash"></i> Event successfully deleted');
      }
    }, () => removeAlert());
});
