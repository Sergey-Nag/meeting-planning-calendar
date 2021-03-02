import Storage from './DatabaseApi';
import { showAlertFull, showAlertAtTop } from './alerts';

const store = Storage.getInstance();

const createForm = document.getElementById('create-event-form');
const submitCreateEventBtn = document.getElementById('create-event-submit');

const inputFields = ['title', 'day', 'time', 'participants'];
const inputFieldElements = inputFields.map((field) => document.querySelector(`form [name=${field}]`) ?? document.querySelector(`form .${field}`));

function changeInputValidClass(isValid, index) {
  const input = inputFieldElements[index];

  if (!input) return;

  if (isValid) input.classList.remove('is-invalid');
  else input.classList.add('is-invalid');
}

function changeInputsClass(arr) {
  arr.forEach(changeInputValidClass);
}

function validateTextValue(value) {
  const res = {
    isValid: true,
    tip: '',
  };

  if (value.length < 3) {
    res.isValid = false;
    res.tip = 'Length of title must be longer than 2 symbols\n';
  } else if (value.length > 40) {
    res.isValid = false;
    res.tip = 'Length of title mustn\'t be longer than 40 symbols\n';
  }

  if (/\*|`|%|\$|;|:|\/|\\/.test(value)) {
    res.isValid = false;
    res.tip += "Title mustn't consist symbols like '*, `, %, $, ;, :, \\, /'";
  }

  return res;
}

function showTip(tip, index) {
  const tipElement = inputFieldElements[index].nextElementSibling;

  tipElement.innerText = tip;

  if (tip === '') {
    tipElement.classList.remove('invalid-feedback');
  } else {
    tipElement.classList.add('invalid-feedback');
  }
}

function showTips(arr) {
  arr.forEach((el, i) => {
    if (typeof el === 'object') {
      changeInputValidClass(el.isValid, i);
      showTip(el.tip, i);
    }
  });
}

function validateValues(data) {
  const validatedArr = inputFields.map((field) => {
    const value = data[field];
    if (!value) return false;

    if (field === 'title') return validateTextValue(value);
    if (field === 'participants') return value.length > 0;

    return value !== '';
  });

  return validatedArr;
}

function getDataFromInputs(form) {
  return [...form].reduce((obj, input) => {
    if (input.classList.contains('btn-close')) return obj;

    const { name, value } = input;
    const result = { ...obj };

    if (Object.keys(result).includes(name)) result[name].push(value);
    else if (name === 'participants') result[name] = [value];
    else result[name] = value;

    return result;
  }, {});
}

function isAllValuesAreValid(arr) {
  return arr.every((el) => {
    if (typeof el === 'object') return el.isValid === true;
    return el === true;
  });
}

async function submitForm() {
  const data = getDataFromInputs(createForm);

  const validatedValues = validateValues(data);

  changeInputsClass(validatedValues);

  showTips(validatedValues);

  if (!isAllValuesAreValid(validatedValues)) return;

  if (await store.getEventByDayTime(data.day, data.time)) {
    showAlertAtTop(`Failed to create an event. Time slot at ${data.day} ${data.time} is already booked.`);
    return;
  }

  const addEventResponse = await store.setEvent(data);

  if (!addEventResponse) return;

  showAlertFull(
    `Event "${data.title}" was successfully created`, 2000,
    () => {
      window.location = 'index.html';
    },
  );
  submitCreateEventBtn.disabled = true;
}

store.getAllEvents();
submitCreateEventBtn.addEventListener('click', submitForm);
