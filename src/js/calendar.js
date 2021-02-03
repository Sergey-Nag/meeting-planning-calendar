import { Tooltip } from 'bootstrap';
import store from './localStorageApi';

function createEventCard({ title, participants }) {
  const avatarImgs = participants
    .map((name) => {
      const { avatar } = store.getUserInfo(name);
      return `<img data-bs-toggle="tooltip" title="${name}" src="img/${avatar}" alt="${name}" class="card__avatar">`;
    }).join('');

  return `<div class="card calendar__card d-flex justify-content-between">
    <div class="card__title"><span>${title}</span></div>
    <div class="card__avatars">${avatarImgs}</div>
    <button type="button" class="btn-close calendar__btn_close" aria-label="Close"></button>
  </div>`;
}

const events = store.getAllEvents();

events.forEach((event) => {
  const card = createEventCard(event);

  const ceilSelector = `td[data-day="${event.day}"][data-time="${event.time}"]`;
  const ceil = document.querySelector(ceilSelector);

  ceil.innerHTML = card;
});

document.querySelectorAll('.card__avatar').forEach((el) => new Tooltip(el, { delay: 500 }));

export default store;
