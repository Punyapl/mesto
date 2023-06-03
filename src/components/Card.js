class Card {
    constructor(data, owner, { handleCardClick, handleAddLike, handleRemoveLike, handleDeleteCard }) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._isOwner = owner;
        this._id = data._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._remove = this._remove.bind(this);
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
        // this._deleteBtn.addEventListener("click", () => {
        //     this._deleteCard();
        // });
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

    _remove() {
        this._handleDeleteCard(this._id);
    }

    _renderTrashcanIcon() {
        if (this._isOwner) {
          this._deleteButton = this._element.querySelector(".elements__dlt-btn");
          this._deleteButton.classList.add("elements__dlt-btn_active");
          this._deleteButton.addEventListener("click", () => {
            this._handleDeleteCard(this._id);
          });
        }
      }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".elements__text").textContent = this._name;
        this._cardPic.src = this._link;
        this._cardPic.alt = this._name;
        this.updateCounterLikes(this._likes.length);
        this._renderTrashcanIcon();

        return this._element;
    }

    updateCounterLikes(counter) {
        this._element.querySelector(".elements__likecount").textContent =
            counter > 0 ? counter : "0";
    }
}

export default Card