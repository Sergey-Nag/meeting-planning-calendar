import store from './DatabaseApi';
import { showAlertConfirm, removeAlert } from './alerts';
import placeAllEvents from './calendar';

function removeEvent({ day, time }) {
  store.removeEvent((el) => el.day === day && el.time === time);
}

document.getElementById('calendar').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-close');

  if (!btn) return;

  const eventContainer = btn.closest('td');
  const eventTitle = eventContainer.querySelector('.card__title').textContent;

  showAlertConfirm(`Are you sure you want to delete "${eventTitle}" event?`,
    () => {
      removeEvent(eventContainer.dataset);
      placeAllEvents();
      removeAlert();
    }, () => removeAlert());
});
