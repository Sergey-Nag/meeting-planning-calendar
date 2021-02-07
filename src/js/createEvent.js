import store from './localStorageApi';

console.log(store);
const createForm = document.getElementById('create-event-form');
const submitCreateEventBtn = document.getElementById('create-event-submit');
const eventName = document.getElementById('event-name');
const eventDay = document.getElementById('event-day');
const eventTime = document.getElementById('event-time');
const eventParticipans = document.getElementById('event-participants');

// const eventData = {
//   title: null,
//   day: null,
//   time: null,
//   prticipants: null,
// };

function valueInputChangeHandle() {
  const { value } = this;

  if (!value.trim()) return;

  console.log(value);
}

function getDataFromInputs(form) {
  return [...form].reduce((obj, input) => {
    const { name, value } = input;
    const result = { ...obj };

    if (Object.keys(result).includes(name)) result[name].push(value);
    else if (name === 'participants') result[name] = [value];
    else result[name] = value;

    return result;
  }, {});
}

function submitForm() {
  const data = getDataFromInputs(createForm);

  console.log(store.setEvent(data), data);
}

eventName.addEventListener('change', valueInputChangeHandle);
eventDay.addEventListener('change', valueInputChangeHandle);
eventTime.addEventListener('change', valueInputChangeHandle);

submitCreateEventBtn.addEventListener('click', submitForm);

console.log(eventParticipans);
