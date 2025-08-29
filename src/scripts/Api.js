class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
       headers: {
    authorization: "8bae3b2e-af0a-4971-b60d-c632aa9e9531",
  },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  getInitialCards() {
    return this._request('/cards');
  }

  getUserInfo() {
    return this._request('/users/me');
  }

  loadAppData() {
    return Promise.all([
      this.getUserInfo(),
      this.getInitialCards()
    ]);
  }
}

export default Api;
