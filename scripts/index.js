import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const editFormElement = document.querySelector('.popup__form-edit');
const addFormElement = document.querySelector('.popup__form-add');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__caption');
const nameInputCard = document.querySelector('.popup__input_card-name');
const linkInputCard = document.querySelector('.popup__input_card-link');
const zoomPic = document.querySelector('.popup-zoom__img');
const zoomText = document.querySelector('.popup-zoom__title')

const addSaveBtn = document.querySelector('.add-svbtn');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupZoom = document.querySelector('.popup-zoom');
const popups = Array.from(document.querySelectorAll(".popup"));

const profileEditExit = document.querySelector(".popup__closebtn-edit");
const profileEditBtn = document.querySelector(".profile__edit");

const cardAddBtn = document.querySelector(".profile__add");
const cardAddExit = document.querySelector(".popup__closebtn-add");

const zoomExitBtn = document.querySelector(".popup-zoom__close");

const cardTemplate = document.querySelector("#card").content;
const cardElement = cardTemplate.querySelector(".elements__element");
const cardsContainer = document.querySelector('.elements');

const validationList = ({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__savebut",
  inactiveButtonClass: "popup__savebut_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active"
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}


function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleOverlayClick(popup) {
  popup.addEventListener("mousedown", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
}

function closeEditPopup() {
  closePopup(popupEdit);
}

function openEditPopup() {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  const formValidatorEditPopup = new FormValidator(validationList, editFormElement);
  formValidatorEditPopup.resetValidation();
  openPopup(popupEdit);
}

function closeAddPopup() {
  closePopup(popupAdd);
}

function openAddPopup() {
  openPopup(popupAdd);
}

function closeZoomPopup() {
  closePopup(popupZoom);
}

function openZoomPopup(link,name) {
  zoomPic.src = link;
  zoomPic.alt = name;
  zoomText.textContent = name;
  openPopup(popupZoom);
}


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  closeEditPopup()
}

function toggleSubmitButton() {
  toggleButtonState();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardName = nameInputCard.value;
  const cardLink = linkInputCard.value;
  addCard(cardName, cardLink);
  evt.target.reset();
  toggleSubmitButton();
  closeAddPopup();
}

function createNewCard(data,template) {
  const card = new Card(data,template);
  return card.createCard();
}

function renderCard(newCard) {
  cardsContainer.prepend(newCard);
}

initialCards.forEach(data => {
  const newCard = createNewCard(data, '#card');
  renderCard(newCard);
});

function addCard(name,link){
  const data = {name: name, link: link};
  const newCard = createNewCard(data, '#card');
  renderCard(newCard);
}

profileEditExit.addEventListener('click', closeEditPopup);
profileEditBtn.addEventListener('click', openEditPopup);
cardAddBtn.addEventListener('click', openAddPopup);
cardAddExit.addEventListener('click', closeAddPopup);
zoomExitBtn.addEventListener('click', closeZoomPopup);

const formValidatorEdit = new FormValidator(validationList, editFormElement);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(validationList, addFormElement);
formValidatorAdd.enableValidation();

editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);

popups.forEach((popup) => {
  handleOverlayClick(popup);
});

export {openZoomPopup};