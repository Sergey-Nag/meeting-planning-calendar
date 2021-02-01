import Storage from './localStorageApi';

const store = new Storage();

function createEventCard(data) {
  const avatarsUrl = data.participants
    .map((name) => {
      const { avatar } = store.getUserInfo(name);
      return `<img src="h${avatar}" alt="${name}" class="card__avatar">`;
    }).join('');

  return `<div class="card calendar__card">
    <div class="card__title"><span>${data.title}</span></div>
    <div class="card__avatars">${avatarsUrl}</div>
    <button type="button" class="btn-close calendar__btn_close" aria-label="Close"></button>
  </div>`;
}

const events = store.getAllEvents();

events.forEach((event) => {
  const card = createEventCard(event);
  const selector = `td[data-day="${event.day}"][data-time="${event.time}"]`;
  const ceil = document.querySelector(selector);
  ceil.innerHTML = card;
});

export default store;
