export const initialCards = [
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

export const validationList = ({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__savebut",
    inactiveButtonClass: "popup__savebut_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error_active"
});

export const editFormElement = document.querySelector('.popup__form-edit');
export const addFormElement = document.querySelector('.popup__form-add');
export const nameInput = document.querySelector('.popup__input_name');
export const jobInput = document.querySelector('.popup__input_job');
export const nameOutput = document.querySelector('.profile__name');
export const jobOutput = document.querySelector('.profile__caption');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popupZoom = document.querySelector('.popup-zoom');
export const popupAvatar = document.querySelector('.popup-avatar');
export const profileEditBtn = document.querySelector(".profile__edit");
export const cardAddBtn = document.querySelector(".profile__add");
export const avatarImg = document.querySelector(".profile__avatar");
export const avatarBtn = document.querySelector(".profile__avatarbtn");