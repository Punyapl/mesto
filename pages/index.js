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
      const cardElement = createCardElement(item.name, item.link, '#card');
      cardsSection.addItem(cardElement);
  }
}, '.elements');
cardsSection.renderItems();

const popupImageOpen = new PopupWithImage(popupZoom);
popupImageOpen.setEventListeners();

function createCardElement(title, link, template) {
    const handleCardClick = () => {
        popupImageOpen.open(title, link);
    };
    const card = new Card(title, link, template, handleCardClick);
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
  const cardNewElement = createCardElement(data.name, data.link, '#card');
  cardsSection.addItem(cardNewElement);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

cardAddBtn.addEventListener('click', () => {
  popupAddCard.open();
  formValidatorAdd.resetValidation();
});