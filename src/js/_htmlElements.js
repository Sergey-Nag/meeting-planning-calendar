export function createAlertHTML(text) {
  return `<div class="card alert bg-success text-white">${text}</div>`;
}

export function createAlertDangerTopHTML(text) {
  return `<div class="container px-5">
    <div class="row">
      <div class="col-11">${text}</div>
      <div class="col-1">
        <butto id="danger-alert-close" type="button" class="btn-close btn-close-white float-right" aria-label="Close"></button>
      </div>
    </div>
  </div>`;
}

export function createConfirmHTML(text) {
  return `<div class="alert bg-light">${text}<hr><div class="row">
    <div class="col-6"><button id="event-delete-no" type="button" class="btn btn-outline-danger w-100">No</button></div>
    <div class="col-6"><button id="event-delete-yes" type="button" class="btn btn-success w-100">Yes</button></div>
  </div>
</div>`;
}

export function createEventCardHTML(id, title, avatarImgs) {
  return `<div class="card calendar__card d-flex justify-content-between">
  <div class="card__title"><span>${title}</span></div>
  <div class="card__avatars">${avatarImgs}</div>
  <button type="button" class="btn-close calendar__btn_close" data-id="${id}"></button>
</div>`;
}

export function createParticipantHTML({ name, avatar }) {
  return `<div class="participant">
  <img src="./img/${avatar}" class="participant__avatar" alt="${name}">
  <span class="participant__name">${name}</span>
  <input type="hidden" value="${name}" name="participants">
  <button class="btn-close participant__btn-remove" data-name="${name}"></button>
</div>`;
}

export function createParticipantsWrappPlaceholder() {
  return '<h5 class="mt-2 text-warning">Choose the participants <i class="bi bi-arrow-right-short font-icon"></i></h5>';
}

export function createUserHTML({ name, avatar, isChecked }) {
  return `<div class="card user" data-name="${name}">
    <div class="row">
      <div class="col-3">
        <img src="./img/${avatar}" alt="" class="border rounded-circle w-100">
      </div>
      <div class="col-7 d-flex flex-column justify-content-center">
        <span>${name}</span>
      </div>
      <div class="col-2 d-flex flex-column justify-content-center">
        <input class="form-check-input" type="checkbox" value="${name}" ${isChecked ? 'checked' : ''}>
      </div>
    </div>
  </div>`;
}

export function createAuthoriseConfirmHTML(optionsWithNames) {
  return `<div class="alert bg-light" style="width: 300px">Please authorise <br>
    <select class="form-select mt-2" id="auth-names">${optionsWithNames}</select>
    <hr>
    <div class="row">
      <div class="col"><button id="authorise-btn" type="button" class="btn btn-success w-100">Confirm</button></div>
    </div>
  </div>`;
}
