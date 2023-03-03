// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__caption');
const profileSaveBtn = document.querySelector('.popup__savebut_svbtn');
const popup = document.querySelector('.popup');
console.log(popup)
const profileEditExit = document.querySelector(".popup__closebtn")
const profileEditBtn = document.querySelector(".profile__edit")

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
console.log("done!")
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    console.log("done!")
    PopupClose()
}

function PopupClose(){
    popup.classList.remove('popup_opened');
    console.log("closed")
}

function PopupOpen(){
    popup.classList.add('popup_opened');
}

// function likeBtnTggl(){
    
// }

profileEditExit.addEventListener('click', PopupClose);
profileEditBtn.addEventListener('click', PopupOpen);


formElement.addEventListener('submit', handleFormSubmit); 
