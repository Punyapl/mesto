export default class Section {

    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    renderItems(itemList) {
        itemList.forEach(item => {
            this._renderer(item, this._container);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }

}