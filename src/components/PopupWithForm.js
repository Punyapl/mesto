import { Popup }  from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupElement, submitForm) {
        super(popupElement);
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputArray = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputArray.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });

    }

    renderLoading(text) {
        this._form.querySelector('.popup__savebut').textContent = text;
    }

    close() {
        super.close();
        this._form.reset();
    }
}