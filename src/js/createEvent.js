import store from './localStorageApi';

const createForm = document.getElementById('create-event-form');
const submitCreateEventBtn = document.getElementById('create-event-submit');

const inputFields = ['title', 'day', 'time', 'participants'];
const inputFieldElements = inputFields.map((field) => document.querySelector(`form [name=${field}]`));

function changeInputValidClass(isValid, index) {
  const input = inputFieldElements[index];

  if (!input) return;

  if (isValid) input.classList.remove('is-invalid');
  else {
    console.log(input);
    input.classList.add('is-invalid');
  }
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

function submitForm() {
  const data = getDataFromInputs(createForm);

  const validatedValues = validateValues(data);

  changeInputsClass(validatedValues);

  showTips(validatedValues);

  if (isAllValuesAreValid(validatedValues)) {
    store.addEvent(data);
    // showAlert('success', 'Event created');
  }
}

submitCreateEventBtn.addEventListener('click', submitForm);
