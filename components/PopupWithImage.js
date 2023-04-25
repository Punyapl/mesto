import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._popupImage = this._popupElement.querySelector('.popup-zoom__img');
        this._popupImageTitle = this._popupElement.querySelector('.popup-zoom__title');
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageTitle.textContent = name;
        super.open();
    }
}