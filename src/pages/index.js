import './index.css';

import {
  initialCards,
  validationList,
  editFormElement,
  addFormElement,
  nameInput,
  jobInput,
  nameOutput,
  jobOutput,
  popupEdit,
  popupAdd,
  popupZoom,
  profileEditBtn,
  cardAddBtn
} from '../utils/constants.js';

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const popupImageOpen = new PopupWithImage(popupZoom);
popupImageOpen.setEventListeners();
const handleCardClick = (item) => {
  popupImageOpen.open(item.name, item.link);
};

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
      const cardElement = createCardElement(item.name, item.link);
      cardsSection.addItem(cardElement);
  }
}, '.elements');
cardsSection.renderItems();



function createCardElement(title, link) {
    const card = new Card(title, link, handleCardClick);
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
  const cardNewElement = createCardElement(data.name, data.link);
  cardsSection.addItem(cardNewElement);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

cardAddBtn.addEventListener('click', () => {
  popupAddCard.open();
  formValidatorAdd.resetValidation();
});