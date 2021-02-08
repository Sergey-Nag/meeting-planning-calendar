import store from './localStorageApi';
import placeAllEvents from './calendar';
import { showAlertConfirm, removeAlert } from './alerts';

const calendar = document.getElementById('calendar');

const dragData = {
  isDragAllow: true,
  element: null,
  originalElement: null,
  top: 0,
  left: 0,
  mouseX: 0,
  mouseY: 0,
};

function setDragElementPosition() {
  dragData.element.style.top = `${dragData.mouseY - dragData.top}px`;
  dragData.element.style.left = `${dragData.mouseX - dragData.left}px`;
}

function saveMousePosition({ clientX, clientY }) {
  dragData.mouseX = clientX;
  dragData.mouseY = clientY;
}

function createFloatingCard(originalCard) {
  const floatingCard = originalCard.cloneNode(true);
  dragData.originalElement = originalCard;

  const originalSizes = originalCard.getBoundingClientRect();

  floatingCard.classList.add('floating');

  floatingCard.style.width = `${originalSizes.width}px`;
  floatingCard.style.height = `${originalSizes.height}px`;

  dragData.top = dragData.mouseY - originalSizes.top;
  dragData.left = dragData.mouseX - originalSizes.left;

  return floatingCard;
}

function findDoppableContainer({ clientX, clientY }) {
  dragData.element.style.visibility = 'hidden';
  const elemBelow = document.elementFromPoint(clientX, clientY);
  dragData.element.style.visibility = 'visible';

  return elemBelow?.localName === 'td' && elemBelow;
}

function hideAllPutCells(elem) {
  document.querySelectorAll('.put').forEach((el) => {
    const borderedCell = el;

    if (borderedCell !== elem) borderedCell.className = '';
  });
}
function isEventBooked({ day, time }) {
  return !!store.getEventByDayTime(day, time);
}
function showCellForPut(elem) {
  hideAllPutCells(elem);

  const putCell = elem;
  let cellClass = 'put';

  if (elem.firstChild === dragData.originalElement) cellClass += ' allow';
  else if (putCell.firstChild || isEventBooked(putCell.dataset)) cellClass += ' disallow';
  else cellClass += ' allow';

  if (!elem.classList.contains('put')) putCell.className = cellClass;
}

function changeEventTime(day, time) {
  const { day: oldDay, time: oldTime } = dragData.originalElement.parentNode.dataset;

  store.updateEvent({
    find: (el) => el.day === oldDay && el.time === oldTime,
    changeData: { day, time },
  });

  placeAllEvents();
}

function dragStart(card) {
  if (!dragData.isDragAllow) return;

  dragData.element = createFloatingCard(card);

  card.classList.add('dragged');

  document.body.prepend(dragData.element);

  setDragElementPosition();
}

function dragMove(e) {
  if (!dragData.element || !dragData.isDragAllow) return;

  saveMousePosition(e);

  setDragElementPosition();

  const elemBelow = findDoppableContainer(e);

  if (elemBelow) showCellForPut(elemBelow);
}

function confirmChangeEvent({ day, time }) {
  const title = dragData.originalElement.querySelector('.card__title span').textContent;

  dragData.isDragAllow = false;

  const closeAlert = removeAlert(() => {
    dragData.isDragAllow = true;
  });

  showAlertConfirm(`Do you really want to change an "${title}" event date to <b>${day} ${time}</b>?`, () => {
    changeEventTime(day, time);
    closeAlert();
  },
  closeAlert,
  () => { dragData.isDragAllow = true; });
}

function dragEnd(e) {
  if (!dragData.isDragAllow) return;

  const elemBelow = findDoppableContainer(e);
  const isBooked = elemBelow ? isEventBooked(elemBelow.dataset) : true;

  if (!isBooked) {
    confirmChangeEvent(elemBelow.dataset);
  }

  dragData.element.remove();
  dragData.element = null;
  dragData.originalElement.classList.remove('dragged');

  hideAllPutCells(false);
}

calendar.addEventListener('mousedown', (e) => {
  const card = e.target.closest('.calendar__card');
  const isDeleteButton = e.target.classList.contains('btn-close');

  if (isDeleteButton || !card || e.button !== 0) return;

  saveMousePosition(e);
  dragStart(card);
});

document.addEventListener('mousemove', dragMove);

document.addEventListener('mouseup', (e) => {
  if (!dragData.element) return;

  saveMousePosition(e);
  dragEnd(e);
});
