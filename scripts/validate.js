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

function formInputHandle(evt, inputList, submitButton, settings) {
    checkValidity(evt.target, settings);
    if (inputList.some(input => !input.validity.valid)) {
        submitButton.classList.add(settings.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(settings.inactiveButtonClass);
        submitButton.disabled = false;
    }
}

function enableValidation(settings) {
    const formList = document.querySelectorAll(settings.formSelector);
    formList.forEach(form => {
        const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
        const submitButton = form.querySelector(settings.submitButtonSelector);
        form.addEventListener('input', evt => {
            formInputHandle(evt, inputList, submitButton, settings);
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