const calendar = document.getElementById('calendar');

const dragData = {
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

  //  console.log(originalSizes);
  floatingCard.classList.add('floating');

  floatingCard.style.width = `${originalSizes.width}px`;
  floatingCard.style.height = `${originalSizes.height}px`;

  dragData.top = dragData.mouseY - originalSizes.top;
  dragData.left = dragData.mouseX - originalSizes.left;

  return floatingCard;
}

function dragStart(card) {
  dragData.element = createFloatingCard(card);

  card.classList.add('dragged');

  document.body.prepend(dragData.element);
  setDragElementPosition();

  dragData.element.onmousedown = () => false;
}

function findDoppableContainer({ clientX, clientY }) {
  dragData.element.hidden = true;
  const elemBelow = document.elementFromPoint(clientX, clientY);
  dragData.element.hidden = false;

  return elemBelow;
}

function dragMove() {
  setDragElementPosition();
}

function dragEnd() {
  dragData.element.remove();
  dragData.element = null;
  dragData.originalElement.classList.remove('dragged');
//  console.log(dragData.element);
}

calendar.addEventListener('mousedown', (e) => {
  const card = e.target.closest('.calendar__card');
  const isDeleteButton = e.target.classList.contains('btn-close');

  if (isDeleteButton || !card || e.button !== 0) return;

  saveMousePosition(e);
  dragStart(card);
});

document.addEventListener('mousemove', (e) => {
  if (!dragData.element) return;

  saveMousePosition(e);
  dragMove();
  findDoppableContainer(e);
//  console.log(tdBelow);
});

document.addEventListener('mouseup', (e) => {
  if (!dragData.element) return;

  saveMousePosition(e);
  dragEnd();
});
