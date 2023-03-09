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

const profileSaveBtn = document.querySelector('.popup__savebut_svbtn');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupZoom = document.querySelector('.popup-zoom');

const profileEditExit = document.querySelector(".popup__closebtn-edit");
const profileEditBtn = document.querySelector(".profile__edit");

const cardAddBtn = document.querySelector(".profile__add");
const cardAddExit = document.querySelector(".popup__closebtn-add");

const zoomExitBtn = document.querySelector(".popup-zoom__close");

const cardTemplate = document.querySelector("#card").content;
const cardElement = cardTemplate.querySelector(".elements__element");
const cardsContainer = document.querySelector('.elements');

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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closeEditPopup() {
  closePopup(popupEdit);
}

function openEditPopup() {
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

function openZoomPopup() {
  openPopup(popupZoom);
}


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  closeEditPopup()
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardName = nameInputCard.value;
  const cardLink = linkInputCard.value;
  renderCard(cardName, cardLink)
  evt.target.reset();
  closeAddPopup()
}

function createNewCard(name, link) {
  const cardClone = cardElement.cloneNode(true);
  const cardPic = cardClone.querySelector(".elements__image");
  const cardText = cardClone.querySelector(".elements__text");
  const deleteBtn = cardClone.querySelector(".elements__dlt-btn");
  const likeBtn = cardClone.querySelector(".elements__likebut");

  deleteBtn.addEventListener("click", () => cardClone.remove());
  likeBtn.addEventListener("click", () => likeBtn.classList.toggle("elements__likebut_active"));
  cardPic.addEventListener("click", (evt) => {
    openZoomPopup();
    zoomPic.src = evt.target.src;
    zoomPic.alt = evt.target.alt;
    zoomText.textContent = evt.target.alt;
  });


  cardPic.src = link;
  cardPic.alt = name;
  cardText.textContent = name;

  return cardClone;
}

function renderCard(name, link) {
  const newCard = createNewCard(name, link);
  cardsContainer.prepend(newCard);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});

profileEditExit.addEventListener('click', closeEditPopup);
profileEditBtn.addEventListener('click', openEditPopup);
cardAddBtn.addEventListener('click', openAddPopup);
cardAddExit.addEventListener('click', closeAddPopup);
zoomExitBtn.addEventListener('click', closeZoomPopup);


editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
