function showError(input, settings) {
    const inputError = document.querySelector(`.${input.id}-error`);
    input.classList.add(settings.inputErrorClass);
    inputError.textContent = input.validationMessage;
    inputError.classList.add(settings.errorClass);
}

function hideError(input, settings) {
    const inputError = document.querySelector(`.${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    inputError.classList.remove(settings.errorClass);
}

function checkValidity(input, settings) {
    if (input.validity.valid) {
        hideError(input, settings);
    } else {
        showError(input, settings);
    }
}

const hasInvalidInput = (inputList) =>{
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, settings) =>{
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true; 
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false; 
  }
}

function handleFormInput(evt, inputList, submitButton, settings) {
    checkValidity(evt.target, settings);
    toggleButtonState(inputList, submitButton, settings);
}

function enableValidation(settings) {
    const formList = document.querySelectorAll(settings.formSelector);
    formList.forEach(form => {
        
        const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
        const submitButton = form.querySelector(settings.submitButtonSelector);
        toggleButtonState(inputList, submitButton, settings);
        form.addEventListener('input', evt => {
            handleFormInput(evt, inputList, submitButton, settings);
        })
    });
}

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__savebut",
    inactiveButtonClass: "popup__savebut_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error_active",
});