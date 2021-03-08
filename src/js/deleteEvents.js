import Storage from './DatabaseApi';
import NotifyResponse from './DatabaseDecorator';
import { showAlertConfirm, removeAlert } from './alerts';
import EventEmmiter from './EventEmitter';

const events = EventEmmiter.getInstance();

const storeInstance = Storage.getInstance();
const store = new NotifyResponse(storeInstance);

document.getElementById('calendar').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-close');

  if (!btn) return;

  const eventCard = btn.closest('.card');
  const eventTitle = eventCard.querySelector('.card__title').textContent;

  showAlertConfirm(
    `Are you sure you want to delete "${eventTitle}" event?`,
    async () => {
      const isEventRemoved = await store.removeEvent(eventCard.dataset.id);
      removeAlert();

      if (!isEventRemoved) return;

      events.emit('update-events');
    },
    () => removeAlert()
  );
});
