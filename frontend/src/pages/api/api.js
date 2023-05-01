class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  async authenticate(email, password) {
    const reqToken = await fetch('http://localhost:8081/users/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!reqToken.ok) {
      throw new Error('Email ou senha inválidos');
    }
    let data = await reqToken.json();
    window.localStorage.setItem('token', data.token);
    api.setToken(data.token);
  }

  async getUserInfo() {
    const userDataRes = await fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    });
    let userData = await userDataRes.json();
    return userData;
  }

  async createUser(userName, idade, incremento, email, password) {
    const userDataRes = await fetch(this._baseUrl + '/users/register', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: userName,
        idade: idade,
        incremento: incremento,
        email: email,
        password: password,
      }),
    });
    let res = await userDataRes.json();
    return res;
  }

  async updateUser(userName, idade, incremento, email, password) {
    const userDataRes = await fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: userName,
        idade: idade,
        incremento: incremento,
        email: email,
        password: password,
      }),
    });
    let res = await userDataRes.json();
    return res;
  }

  async deleteUser() {
    const userDeleted = await fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: 'DELETE',
    });
    let res = await userDeleted.json();
    return res;
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
