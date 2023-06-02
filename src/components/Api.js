export default class Api {
  constructor(config){
      this.baseUrl = config.baseUrl;
      this.headers = config.headers;
  }

  _handleResponse(response, errorMessage) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Ошибка: ${response.status}. Текст ошибки: ${errorMessage}`)
      );
  }

  getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
        method: "GET",
      }).then((response) => {
        return this._handleResponse(
          response,
          "Данные о пользователе не были успешно получены"
        );
      });
  }

  updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о пользователе не были успешно обновлены на сервере"
      );
    });
  } 
}