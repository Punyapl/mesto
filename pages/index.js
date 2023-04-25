// import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import initialCards from "../components/initialCards.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";



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
// const cardElement = cardTemplate.querySelector(".elements__element");
const cardsContainer = document.querySelector('.elements');

const validationList = ({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__savebut",
  inactiveButtonClass: "popup__savebut_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active"
});

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
      const cardElement = createCardElement(item, '#card');
      cardsSection.addItem(cardElement);
  }
}, '.elements');
cardsSection.renderItems();

const popupImageOpen = new PopupWithImage(popupZoom);
popupImageOpen.setEventListeners();

function createCardElement(item, template) {
    const handleCardClick = () => {
        popupImageOpen.open(item.name, item.link);
    };
    const card = new Card(item, template, handleCardClick);
    const cardElement = card.createCard();
    return cardElement;
}

const formValidatorEdit = new FormValidator(validationList, editFormElement);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(validationList, addFormElement);
formValidatorAdd.enableValidation();

const userInfo = new UserInfo(nameOutput, jobOutput);

const popupEditForm = new PopupWithForm(popupEdit, (editData) => {
  const { name, job } = editData;
  userInfo.setUserInfo({ name, job });
  popupEditForm.close();
});
popupEditForm.setEventListeners();

profileEditBtn.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupEditForm.open();
});

const popupAddCard = new PopupWithForm(popupAdd, (data) => {
  const cardNewElement = createCardElement(data, cardTemplate);
  cardsSection.addItem(cardNewElement);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

cardAddBtn.addEventListener('click', () => {
  popupAddCard.open();
  formValidatorAdd.resetValidation();
});
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEscape);
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEscape);
// }


// function closePopupEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// function handleOverlayClick(popup) {
//   popup.addEventListener("mousedown", (event) => {
//     if (event.target === popup) {
//       closePopup(popup);
//     }
//   });
// }

// function closeEditPopup() {
//   closePopup(popupEdit);
// }

// function openEditPopup() {
//   nameInput.value = nameOutput.textContent;
//   jobInput.value = jobOutput.textContent;
//   formValidatorEdit.resetValidation(); 
//   openPopup(popupEdit);
// }

// function closeAddPopup() {
//   closePopup(popupAdd);
// }

// function openAddPopup() {
//   formValidatorAdd.toggleButtonState()
//   openPopup(popupAdd);
// }

// function closeZoomPopup() {
//   closePopup(popupZoom);
// }

// function openZoomPopup(link,name) {
//   zoomPic.src = link;
//   zoomPic.alt = name;
//   zoomText.textContent = name;
//   openPopup(popupZoom);
// }


// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   nameOutput.textContent = nameInput.value;
//   jobOutput.textContent = jobInput.value;
//   closeEditPopup()
// }

// function toggleSubmitButton() {
//   toggleButtonState();
// }

// function handleAddFormSubmit(evt) {
//   evt.preventDefault();
//   const cardName = nameInputCard.value;
//   const cardLink = linkInputCard.value;
//   addCard(cardName, cardLink);
//   evt.target.reset();
//   toggleSubmitButton();
//   closeAddPopup();
// }

// function createNewCard(data,template) {
//   const card = new Card(data,template);
//   return card.createCard();
// }

// function renderCard(newCard) {
//   cardsContainer.prepend(newCard);
// }

// initialCards.forEach(data => {
//   const newCard = createNewCard(data, '#card');
//   renderCard(newCard);
// });

// function addCard(name,link){
//   const data = {name: name, link: link};
//   const newCard = createNewCard(data, '#card');
//   renderCard(newCard);
// }

// profileEditExit.addEventListener('click', closeEditPopup);
// profileEditBtn.addEventListener('click', openEditPopup);
// cardAddBtn.addEventListener('click', openAddPopup);
// cardAddExit.addEventListener('click', closeAddPopup);
// zoomExitBtn.addEventListener('click', closeZoomPopup);

// const formValidatorEdit = new FormValidator(validationList, editFormElement);
// formValidatorEdit.enableValidation();
// const formValidatorAdd = new FormValidator(validationList, addFormElement);
// formValidatorAdd.enableValidation();

// editFormElement.addEventListener('submit', handleProfileFormSubmit);
// addFormElement.addEventListener("submit", handleAddFormSubmit);

// popups.forEach((popup) => {
//   handleOverlayClick(popup);
// });

// export {openZoomPopup};