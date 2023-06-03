class Card {
    constructor(data, owner, { handleCardClick, handleAddLike, handleRemoveLike }) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._isOwner = owner;

        this._handleCardClick = handleCardClick;
        //this._handleRemoveCard = handleRemoveCard;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
    }

    _getTemplate() {
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
            if (this._likeBtn.classList.contains("elements__likebut_active"))
                this._handleRemoveLike();
            else
                this._handleAddLike();
        });
        this._deleteBtn.addEventListener("click", () => {
            this._deleteCard();
        });
    }

    _toggleLike() {
        this._likeBtn.classList.toggle("elements__likebut_active");
    }

    _renderLikeIcon() {
        this._likes.forEach(() => {
            if (this._isOwner) {
                this._element
                    .querySelector(".elements__like")
                    .classList.add("elements__likebut_active");
            }
        });
    }

    _deleteCard() {
        this._element.remove();
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".elements__text").textContent = this._name;
        this._cardPic.src = this._link;
        this._cardPic.alt = this._name;
        this.updateCounterLikes(this._likes.length);


        return this._element;
    }

    updateCounterLikes(counter) {
        this._element.querySelector(".elements__likecount").textContent =
            counter > 0 ? counter : "0";
    }
}

export default Card