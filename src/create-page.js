import '@babel/polyfill';
import './base-import';

import submitForm, { storageInstance, submitCreateEventBtn } from './js/createEvent';
import './js/moveParticipants';

import loadUsers from './js/allUsers';

storageInstance.getAllEvents();
submitCreateEventBtn.addEventListener('click', submitForm);

loadUsers();
