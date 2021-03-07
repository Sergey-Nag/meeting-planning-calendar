import { getDataFromInputs, validateValues, isAllValuesAreValid } from '../js/createEvent';
import toBeArrayAndLengthToBeGreaterThan from './testArray';

describe('Create event form tests', () => {
  expect.extend({
    toBeArrayAndLengthToBeGreaterThan,
  });

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
    expect(dataFromInputs).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        day: expect.any(String),
        time: expect.any(String),
        participants: expect.toBeArrayAndLengthToBeGreaterThan(0),
      }),
    );
  });

  test('validateValues function return array with booleans and objects based of values', () => {
    const testRightData = {
      title: 'Test',
      day: 'Mon',
      time: '10:00',
      participants: ['Ann', 'Steve'],
    };

    let validatedValues = validateValues(testRightData);

    expect(validatedValues).toHaveLength(Object.keys(testRightData).length);

    expect(validatedValues[0].isValid).toBeTruthy();
    expect(validatedValues[0].tip).toBe('');

    for (let i = 1; i < 4; i += 1) {
      expect(validatedValues[i]).toBeTruthy();
    }

    const testWrongData = {
      title: 'a',
      day: null,
      time: null,
      participants: [],
    };

    validatedValues = validateValues(testWrongData);

    expect(validatedValues[0].isValid).toBeFalsy();
    expect(validatedValues[0].tip).not.toBe('');

    for (let i = 1; i < 4; i += 1) {
      expect(validatedValues[i]).toBeFalsy();
    }
  });

  test('isAllValuesAreValid function return true or false depending on all validated values', () => {
    const testTrueData = [{ isValid: true, tip: '' }, true, true, true];

    let isAllTrue = isAllValuesAreValid(testTrueData);

    expect(isAllTrue).toBe(true);

    const testFalseData = [{ isValid: false, tip: '' }, false, false, false];
    isAllTrue = isAllValuesAreValid(testFalseData);

    expect(isAllTrue).toBe(false);
  });
});
