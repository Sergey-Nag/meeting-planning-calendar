import { Tooltip } from 'bootstrap';
import store from './DatabaseApi';
import { createEventCardHTML } from './_htmlElements';
import { getUserInfo } from './_data';
import { showPopup } from './alerts';

function createEventCard(id, { title, participants }) {
  const avatarImgs = participants
    .map((name) => {
      const { avatar } = getUserInfo(name);
      return `<img data-bs-toggle="tooltip" title="${name}" src="img/${avatar}" alt="${name}" class="card__avatar">`;
    }).join('');

  return createEventCardHTML(id, title, avatarImgs);
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
    showPopup('danger', '<b>Loading Events error</b>, please try again');
    return;
  }

  showPopup('success', 'Events successfully loaded');

  removeAllCards();

  eventsArr.forEach(({ id, data }) => {
    const card = createEventCard(id, data);

    const cellSelector = `td[data-day="${data.day}"][data-time="${data.time}"]`;
    const cell = document.querySelector(cellSelector);

    cell.innerHTML = card;
  });

  activeUsersTooltips();
}

export default placeAllEvents;
