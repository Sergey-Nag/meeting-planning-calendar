import { Tooltip } from 'bootstrap';
import store from './DatabaseApi';
import { createEventCardHTML } from './_htmlElements';
import { getUserInfo } from './_data';
import { showAlertAtTop } from './alerts';

function createEventCard({ title, participants }) {
  const avatarImgs = participants
    .map((name) => {
      const { avatar } = getUserInfo(name);
      return `<img data-bs-toggle="tooltip" title="${name}" src="img/${avatar}" alt="${name}" class="card__avatar">`;
    }).join('');

  return createEventCardHTML(title, avatarImgs);
}

function removeAllCards() {
  document.querySelectorAll('.calendar__card').forEach((card) => card.remove());
}

function activeUsersTooltips() {
  document.querySelectorAll('.card__avatar').forEach((el) => new Tooltip(el, { delay: 500 }));
}

async function placeAllEvents() {
  const eventsArr = await store.getPreFilteredEvents();

  if (!eventsArr) {
    showAlertAtTop('Loading error, please try again');
    return;
  }

  removeAllCards();

  eventsArr.forEach(({ data: event }) => {
    const card = createEventCard(event);

    const cellSelector = `td[data-day="${event.day}"][data-time="${event.time}"]`;
    const cell = document.querySelector(cellSelector);

    cell.innerHTML = card;
  });

  activeUsersTooltips();
}

export default placeAllEvents;
