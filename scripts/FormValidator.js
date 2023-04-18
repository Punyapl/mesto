class FormValidator {
    constructor(config, form){
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    _showError(input) {
        const inputError = document.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        inputError.textContent = input.validationMessage;
        inputError.classList.add(this._errorClass);
    }

    _hideError(input) {
        const inputError = document.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass);
    }

    _checkValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    _hasInvalidInput = (inputList) =>{
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    }

    _toggleButtonState = (inputList, buttonElement) =>{
        if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true; 
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false; 
      }
    }

    _handleFormInput(evt, inputList, submitButton) {
        this._checkValidity(evt.target);
        this._toggleButtonState(inputList, submitButton);
    }

    enableValidation() {
        const formList = document.querySelectorAll(this._form);
        formList.forEach(form => {
            
            const inputList = Array.from(form.querySelectorAll(this._inputSelector));
            const submitButton = form.querySelector(this._submitButtonSelector);
            this._toggleButtonState(inputList, submitButton);
            form.addEventListener('input', evt => {
                this._handleFormInput(evt, inputList, submitButton);
            })
        });
    }
}

export default FormValidator;













// enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__savebut",
//     inactiveButtonClass: "popup__savebut_disabled",
//     inputErrorClass: "popup__input_error",
//     errorClass: "popup__error_active"
// });