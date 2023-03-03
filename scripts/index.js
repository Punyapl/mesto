// Находим форму в DOM
const formElement = document.querySelector('.popup__form')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_name')// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_job')// Воспользуйтесь инструментом .querySelector()
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__caption');
const profileSaveBtn = document.querySelector('.popup__btn_save');
const popup = document.querySelector('.popup');
console.log(popup)
const profileEditExit = document.querySelector(".popup__closebtn")
const profileEditBtn = document.querySelector(".profile__edit")

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
console.log("done!")
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
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

profileEditExit.addEventListener('click', PopupClose);
profileEditBtn.addEventListener('click', PopupOpen);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 
