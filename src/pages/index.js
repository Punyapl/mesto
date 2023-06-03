fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me ', {
  headers: {
    authorization: '1bbba12c-60b2-4199-b4df-a4cf1b3d6619'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log('results here!')
    console.log(result);
    console.log('results ended')
  });

import './index.css';

import {
  validationList,
  editFormElement,
  addFormElement,
  nameInput,
  jobInput,
  nameOutput,
  jobOutput,
  avatarImg,
  popupEdit,
  popupAdd,
  popupZoom,
  popupAvatar,
  popupDelete,
  profileEditBtn,
  cardAddBtn,
  avatarBtn
} from '../utils/constants.js';

import Api from "../components/Api.js"; // api сайта
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupDelete.js"
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: '1bbba12c-60b2-4199-b4df-a4cf1b3d6619',
    'Content-Type': 'application/json'
  }
};
const api = new Api(apiConfig);

const popupConfirmDelete = new PopupDelete(popupDelete);
popupConfirmDelete.setEventListeners();

const popupImageOpen = new PopupWithImage(popupZoom);
popupImageOpen.setEventListeners();
const handleCardClick = (item) => {
  popupImageOpen.open(item.name, item.link);
};

const isOwner = (idCard) => {
  return idCard.owner._id === userInfo.getUserInfo().id ? true : false;
};

console.log(isOwner)

function createCardElement(cardData, owner) {
  const card = new Card(cardData, owner, {
    handleCardClick,
    handleAddLike: () => {
      api
        .setLike(cardData._id)
        .then((cardData) =>{
          card._toggleLike();
          card.updateCounterLikes(cardData.likes.length);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleRemoveLike: () => {
      api
        .deleteLike(cardData._id)
        .then((cardData) => {
          card._toggleLike();
          card.updateCounterLikes(cardData.likes.length);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDeleteCard: (cardData) => {
      popupConfirmDelete.open({
        handleSubmit: () => {
          api
            .deleteCard(cardData)
            .then(() => {
              card._deleteCard();
              popupConfirmDelete.close();
            })
            .catch((error) => {
              console.log(error);
            })
        }
      });
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}

const cardsSection = new Section({
  renderer: (item) => {
    const _isOwner = isOwner(item);
    const cardElement = createCardElement(item, _isOwner);
    cardsSection.addItem(cardElement);
  }
}, '.elements');

const formValidatorEdit = new FormValidator(validationList, editFormElement);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(validationList, addFormElement);
formValidatorAdd.enableValidation();

const userInfo = new UserInfo(nameOutput, jobOutput, avatarImg);

Promise.all([api.getUserInfo(), api.getCardList()]) //подгрузка инфы с сервера
  .then(([infoData, cardsSectionData]) => {
    userInfo.setUserInfo( infoData.name, infoData.about );
    userInfo.setAvatar(infoData.avatar);
    cardsSection.renderItems(cardsSectionData.reverse());
  })
  .catch((error) => {
    console.error(error);
  });

const popupEditForm = new PopupWithForm(popupEdit, (editData) => {
  const { name, job } = editData;
  popupEditForm.renderLoading("Сохранение...");
  api
    .updateUserInfo(name, job)
    .then((userData) => {
      userInfo.setUserInfo(userData.name,userData.about);
      popupEditForm.close();
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      popupEditForm.renderLoading("Сохранено");
    })
});
popupEditForm.setEventListeners();
popupConfirmDelete.setEventListeners();

profileEditBtn.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupEditForm.open();
});

const popupAddCard = new PopupWithForm(popupAdd, (data) => {
  popupAddCard.renderLoading("Сохранение...");
  api
    .sentCard(data)
    .then((cardData) =>{
      const cardNewElement = createCardElement(cardData, true);
      cardsSection.addItem(cardNewElement);
      popupAddCard.close();
    })
    .catch((error)=>{
      console.error(error)
    })
    .finally(() => {
      popupAddCard.renderLoading("Сохранить");
    })
});
popupAddCard.setEventListeners();

cardAddBtn.addEventListener('click', () => {
  popupAddCard.open();
  formValidatorAdd.resetValidation();
});



const popupAvatarForm = new PopupWithForm(popupAvatar, (data)=>{
  popupAvatarForm.renderLoading("Сохранение...");
  api
    .updateAvatar(data.link)
    .then((userData) => {
      userInfo.setAvatar(userData.avatar);
      console.log(userData.avatar);
      popupAvatarForm.close();
    })
    .catch((error)=>{
      console.error(error)
    })
    .finally(() => {
      popupAvatarForm.renderLoading("Сохранить");
    })
})
popupAvatarForm.setEventListeners();

avatarBtn.addEventListener('click', () => {
  popupAvatarForm.open();
  formValidatorAdd.resetValidation();
});