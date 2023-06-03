class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputArray = Array.from(form.querySelectorAll(this._inputSelector));
        this._formButton = this._form.querySelector(this._submitButtonSelector);
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

    _hasInvalidInput = () => {
        return this._inputArray.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    toggleButtonState = () => {
        if (this._hasInvalidInput() || this._inputArray.length === 0) {
            this._formButton.classList.add(this._inactiveButtonClass);
            this._formButton.disabled = true;
        } else {
            this._formButton.classList.remove(this._inactiveButtonClass);
            this._formButton.disabled = false;
        }
    }

    _handleFormInput(evt, inputList, submitButton) {
        this._checkValidity(evt.target);
        this.toggleButtonState(inputList, submitButton);
    }

    _setEventListeners() {
        this.toggleButtonState();
        this._inputArray.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this.toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
        this._inputArray.forEach((input) => {
            this._hideError(input);
        })
        this.toggleButtonState();
    }
}

export default FormValidator;