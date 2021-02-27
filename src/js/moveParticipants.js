import { showPopup } from './alerts';
import loadUsers from './allUsers';
import {
  createParticipantHTML,
  createParticipantsWrappPlaceholder,
  createUserHTML,
} from './_htmlElements';

let usersList = null;

async function prepareUserslist() {
  const users = await loadUsers();
  if (!users) return false;

  return users.map((user) => ({ ...user, ...{ isChecked: false } }));
}

const participantsList = [];

function switchUserCheck(name) {
  const userIndex = usersList.findIndex((user) => user.name === name);

  usersList[userIndex].isChecked = !usersList[userIndex].isChecked;
}

function removeParticipant(nameToRemove) {
  const removeIndex = participantsList.findIndex(({ name }) => name === nameToRemove);
  const inUsersListIndex = usersList.findIndex(({ name }) => name === nameToRemove);

  participantsList.splice(removeIndex, 1);
  usersList[inUsersListIndex].isChecked = false;
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

async function start() {
  const usersReplaceHTML = createReplaceHtmlInWrapp('.users__wrapp');
  const participantsReplaceHTML = createReplaceHtmlInWrapp('.participants');

  usersList = await prepareUserslist();

  if (usersList) showPopup('success', '<i class="bi font-icon bi-cloud-check"></i> Users successfully loaded');
  else {
    showPopup('danger', '<i class="bi font-icon bi-cloud-slash-fill"></i> <b>Loading Users error</b>, please, try again');
    return;
  }

  usersReplaceHTML(returnUsersHTML());
  participantsReplaceHTML(returnParticipantsHTML());

  document.querySelector('.users__wrapp').addEventListener('click', usersReplaceHTMLClickHandle(usersReplaceHTML, participantsReplaceHTML));
  document.querySelector('.participants').addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.closest('.participant__btn-remove');
    if (!target) return;

    const nameToRemove = target.dataset.name;
    removeParticipant(nameToRemove);

    usersReplaceHTML(returnUsersHTML());
    participantsReplaceHTML(returnParticipantsHTML());
  });
}

start();
