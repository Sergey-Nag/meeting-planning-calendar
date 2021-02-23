import { Tooltip } from 'bootstrap';
import store from './localStorageApi';
import { createEventCardHTML } from './_htmlElements';
import { getUserInfo } from './_data';

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

function placeAllWEvents() {
  const eventsArr = store.getPreFilteredEvents();

  removeAllCards();

  eventsArr.forEach((event) => {
    const card = createEventCard(event);

    const ceilSelector = `td[data-day="${event.day}"][data-time="${event.time}"]`;
    const ceil = document.querySelector(ceilSelector);

    ceil.innerHTML = card;
  });

  activeUsersTooltips();
}

placeAllWEvents();

export default placeAllWEvents;
