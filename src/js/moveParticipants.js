import store from './localStorageApi';

const usersList = store.getAllUsers()
  .map((user) => ({ ...user, ...{ isChecked: false } }));

const participantsList = [];

function createParticipantHTML({ name, avatar }) {
  return `<div class="participant">
  <img src="./img/${avatar}" class="participant__avatar" alt="${name}">
  <span class="participant__name">${name}</span>
  <input type="hidden" value="${name}" name="participants">
</div>`;
}

function createParticipantsWrappPlaceholder() {
  return '<h5 class="mt-2 text-warning">Choose the participants <i class="bi bi-arrow-right-short font-icon"></i></h5>';
}

function switchUserCheck(name) {
  const userIndex = usersList.findIndex((user) => user.name === name);

  usersList[userIndex].isChecked = !usersList[userIndex].isChecked;
}

function createUserHTML({ name, avatar, isChecked }) {
  return `<div class="card user" data-name="${name}">
    <div class="row">
      <div class="col-3">
        <img src="./img/${avatar}" alt="" class="border rounded-circle w-100">
      </div>
      <div class="col-7 d-flex flex-column justify-content-center">
        <span>${name}</span>
      </div>
      <div class="col-2 d-flex flex-column justify-content-center">
        <input class="form-check-input" type="checkbox" value="${name}" ${isChecked ? 'checked' : ''}>
      </div>
    </div>
  </div>`;
}

function createReplaceHtmlInWrapp(wrappClassName) {
  const wrapp = document.querySelector(wrappClassName);

  return function replace(html) {
    wrapp.innerHTML = html;
  };
}

function returnUsersHTML() {
  return usersList
    .map((user) => createUserHTML(user))
    .join('');
}

function addParticipantsToLisInOrder(user) {
  if (user.isChecked && !participantsList.includes(user)) {
    participantsList.push(user);
  } else if (!user.isChecked && participantsList.includes(user)) {
    const partsIndex = participantsList.findIndex((part) => part.name === user.name);

    participantsList.splice(partsIndex, 1);
  }
}

function returnParticipantsHTML() {
  usersList.forEach(addParticipantsToLisInOrder);

  if (participantsList.length === 0) return createParticipantsWrappPlaceholder();

  return participantsList
    .map((user) => createParticipantHTML(user))
    .join('');
}

function usersReplaceHTMLClickHandle(usersReplace, participantsReplace) {
  return function handle(e) {
    const target = e.target.closest('.user');

    if (!target) return;

    const username = target.dataset.name;

    switchUserCheck(username);
    usersReplace(returnUsersHTML());
    participantsReplace(returnParticipantsHTML());
  };
}

const usersReplaceHTML = createReplaceHtmlInWrapp('.users__wrapp');
const participantsReplaceHTML = createReplaceHtmlInWrapp('.participants');

usersReplaceHTML(returnUsersHTML());
participantsReplaceHTML(returnParticipantsHTML());

document.querySelector('.users__wrapp').addEventListener('click', usersReplaceHTMLClickHandle(usersReplaceHTML, participantsReplaceHTML));
