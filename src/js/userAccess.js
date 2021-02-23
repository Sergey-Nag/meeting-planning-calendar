import { getUserInfo } from './_data';
import Admin from './Admin';

const authorizedUsername = 'Alex';

export default function isUserAdmin(name) {
  return getUserInfo(name) instanceof Admin;
}

if (isUserAdmin(authorizedUsername)) {
  const createEventBtnWrapp = document.getElementById('create-event-btn-wrapp');

  if (createEventBtnWrapp) createEventBtnWrapp.style.display = 'block';
} else if (window.location.pathname === '/create-event.html') {
  window.location.pathname = '/index.html';
}
