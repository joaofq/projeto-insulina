class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  async getUserInfo() {
    const userDataRes = await fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    });
    let userData = await userDataRes.json();
    return userData;
  }
}

const api = new Api({
  baseUrl: 'http://localhost:8081',
  headers: {
    Acccept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
