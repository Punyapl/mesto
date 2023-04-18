import { openZoomPopup } from "./index.js";

class Card {
    constructor(data, template){
        this._name = data.name;
        this._link = data.link;
        this._template = template;
    }

    _getTemplate () {
        this._cardElement = this._template.cloneNode(true);
        return this._cardElement;
    }

    _setEventListeners = () => {
        this._cardPic = this._element.querySelector(".elements__image");
        this._likeBtn = this._element.querySelector(".elements__likebut");
        this._deleteBtn = this._element.querySelector(".elements__dlt-btn");

        this._likeBtn.addEventListener("click", () => {
            this._toggleLike();
        });
        this._deleteBtn.addEventListener("click", () => {
            this._deleteCard();
        });
        this._cardPic.addEventListener("click", () => {
            openZoomPopup(this._link , this._name);
        });
    }

    _toggleLike(){
        this._likeBtn.classList.toggle("elements__likebut_active");
    }

    _deleteCard(){
        this._element.remove();
    }
    createCard(){
        this._element = this._getTemplate();
        this._setEventListeners();

        this._cardPic.src = this._link;
        this._cardPic.alt = this._name;
        this._element.querySelector(".elements__text").textContent = this._name;

        return this._element;
    }
}

export default Card