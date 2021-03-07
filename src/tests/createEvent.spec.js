import { getDataFromInputs, validateValues } from '../js/createEvent';

describe('Create event form test', () => {
  let form;

  beforeAll(() => {
    form = document.createElement('form');
    form.innerHTML = `<input type="text" name="title" value="Test">

    <select name="day">
      <option value>Select weekday</option>
      <option selected value="Mon">Monday</option>
      <option value="Tue">Tuesday</option>
      <option value="Wed">Wednesday</option>
      <option value="Thu">Thursday</option>
      <option value="Fri">Friday</option>
    </select>

    <select name="time">
      <option value>Select time</option>
      <option selected>10:00</option>
      <option>11:00</option>
      <option>12:00</option>
      <option>13:00</option>
      <option>14:00</option>
      <option>15:00</option>
      <option>16:00</option>
      <option>17:00</option>
      <option>18:00</option>
    </select>

    <input type="hidden" value="Ann" name="participants">
    <input type="hidden" value="Steve" name="participants">`;
    form = form.elements;
  });

  test('getDataFromInputs function return transformed object from HTMLCollection', () => {
    const dataFromInputs = getDataFromInputs(form);

    expect(dataFromInputs).toBeInstanceOf(Object);
  });

  test('validateValues function return array with booleans and objects based of values', () => {
    const dataFromInputs = getDataFromInputs(form);
    const validatedValues = validateValues(dataFromInputs);

    console.log(validatedValues);
    expect(validateValues).toHaveLength(Object.keys(dataFromInputs).length);
  });
});
