import Storage from './DatabaseApi';
import placeAllEvents from './calendar';
import { showAlertConfirm, showPopup, removeAlert } from './alerts';
import isUserAdmin from './userAccess';

const store = Storage.getInstance();

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
  return store.getEventByDayTime(day, time);
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

async function changeEventTime(eventId, day, time) {
  const isUpdated = await store.updateEvent(eventId, day, time);
  return isUpdated;
}

function dragStart(card) {
  if (!dragData.isDragAllow) return;

  dragData.element = createFloatingCard(card);

  card.classList.add('dragged');

  document.body.prepend(dragData.element);

  setDragElementPosition();
}

function dragMove(e) {
  setDragElementPosition();

  const elemBelow = findDoppableContainer(e);

  if (elemBelow) showCellForPut(elemBelow);
}

function confirmChangeEvent({ day, time }) {
  const title = dragData.originalElement.querySelector('.card__title span').textContent;

  dragData.isDragAllow = false;
  const allowDragCallback = () => { dragData.isDragAllow = true; };

  showAlertConfirm(`Do you really want to change an "${title}" event date to <b>${day} ${time}</b>?`,
    async () => {
      const isUpdated = await changeEventTime(dragData.originalElement.dataset.id, day, time);

      if (!isUpdated) {
        showPopup('danger', '<i class="bi bi-cloud-slash-fill"></i> <b>Event wasn\'t updated</b>, try again');
        return;
      }

      showPopup('success', '<i class="bi bi-cloud-check"></i> Event was successfully updated');
      placeAllEvents();

      removeAlert(allowDragCallback);
    },
    () => {
      removeAlert(allowDragCallback);
    },
    allowDragCallback);
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
  if (!isUserAdmin()) return;

  const card = e.target.closest('.calendar__card');
  const isDeleteButton = e.target.classList.contains('btn-close');

  if (isDeleteButton || !card || e.button !== 0) return;

  saveMousePosition(e);
  dragStart(card);
});

document.addEventListener('mousemove', (e) => {
  if (!isUserAdmin() || !dragData.element || !dragData.isDragAllow) return;

  saveMousePosition(e);
  dragMove(e);
});

document.addEventListener('mouseup', (e) => {
  if (!isUserAdmin() || !dragData.element) return;

  saveMousePosition(e);
  dragEnd(e);
});
