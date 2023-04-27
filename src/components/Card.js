class Card {
    constructor(name, link, template, handleCardClick){
        this._name = name;
        this._link = link;
        this._template = template;
        this._handleCardClick = handleCardClick;      
    }

    _getTemplate () {
        this._cardElement = document.querySelector('#card').content.querySelector('.elements__element').cloneNode(true);
        return this._cardElement;
    }

    _setEventListeners = () => {
        this._cardPic = this._element.querySelector(".elements__image");
        this._likeBtn = this._element.querySelector(".elements__likebut");
        this._deleteBtn = this._element.querySelector(".elements__dlt-btn");

        this._cardPic.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
            });

        this._likeBtn.addEventListener("click", () => {
            this._toggleLike();
        });
        this._deleteBtn.addEventListener("click", () => {
            this._deleteCard();
        });
    }

    _toggleLike(){
        this._likeBtn.classList.toggle("elements__likebut_active");
    }

    _deleteCard() {
        this._element.remove();
    }
    
    createCard(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".elements__text").textContent = this._name;
        this._cardPic.src = this._link;
        this._cardPic.alt = this._name;
        

        return this._element;
    }
}

export default Card