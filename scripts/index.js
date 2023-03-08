const editFormElement = document.querySelector('.popup__form-edit');
const addFormElement = document.querySelector('.popup__form-add');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__caption');
const nameInputCard = document.querySelector('.popup__input_card-name');
const linkInputCard = document.querySelector('.popup__input_card-link');

const profileSaveBtn = document.querySelector('.popup__savebut_svbtn');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');

const profileEditExit = document.querySelector(".popup__closebtn-edit");
const profileEditBtn = document.querySelector(".profile__edit");

const cardAddBtn = document.querySelector(".profile__add");
const cardAddExit = document.querySelector(".popup__closebtn-add");

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

function EditPopupClose(){
    popupEdit.classList.remove('popup_opened');
}

function EditPopupOpen(){
    popupEdit.classList.add('popup_opened');
}

function AddPopupClose(){
    popupAdd.classList.remove('popup_opened');
}

function AddPopupOpen(){
    popupAdd.classList.add('popup_opened');
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    EditPopupClose()
}

function handleAddFormSubmit(evt){
    evt.preventDefault(); 
    const cardName = nameInputCard.value;
    const cardLink = linkInputCard.value;
    createNewCard(cardName, cardLink);
    renderCard(cardName, cardLink)
    evt.target.reset();
    AddPopupClose()
}

function createNewCard(name,link){
    const cardClone = cardElement.cloneNode(true);
    const cardPic = cardClone.querySelector(".elements__image");
    const cardText = cardClone.querySelector(".elements__text");
    const deleteBtn = cardClone.querySelector(".elements__dlt-btn");
    const likeBtn = cardClone.querySelector(".elements__likebut");

    deleteBtn.addEventListener("click", () => cardClone.remove());
    likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("elements__likebut_active")
  );

    cardPic.src = link;
    cardPic.alt = name;
    cardText.textContent = name;

    return cardClone;
}

function renderCard(name,link){
    const newCard = createNewCard(name,link);
    cardsContainer.prepend(newCard);
}

initialCards.forEach((card) => {
    renderCard(card.name, card.link);
  });

profileEditExit.addEventListener('click', EditPopupClose);
profileEditBtn.addEventListener('click', EditPopupOpen);
cardAddBtn.addEventListener('click', AddPopupOpen);
cardAddExit.addEventListener('click', AddPopupClose);


editFormElement.addEventListener('submit', handleProfileFormSubmit); 
addFormElement.addEventListener("submit", handleAddFormSubmit);
