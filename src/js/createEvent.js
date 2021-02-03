import Storage from './localStorageApi';

const eventName = document.getElementById('event-name');
const eventDay = document.getElementById('event-day');
const eventTime = document.getElementById('event-time');

const store = new Storage();

const eventData = {
  title: null,
  day: null,
  time: null,
  prticipants: null,
};

function valueInputChangeHandle() {
  const { value } = this;

  if (!value.trim()) return;

  console.log(value);
}

eventName.addEventListener('change', valueInputChangeHandle);
eventDay.addEventListener('change', valueInputChangeHandle);
eventTime.addEventListener('change', valueInputChangeHandle);
