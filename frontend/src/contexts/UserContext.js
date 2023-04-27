import { createContext, useState, useEffect, use } from 'react';
import api from '../pages/api/api';

export const UserContext = createContext();
// console.log(localStorage.getItem('token'));

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.setToken(token);
      api.getUserInfo().then((userData) => setData(userData));
    } else {
      console.log('Usuário não registrado!');
    }
  });

  async function userLogin(email, password) {
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
    let data = await reqToken.json();

    window.localStorage.setItem('token', data.token);
    setLogin(true);
    api.setToken(data.token);
    setData(api.getUserInfo());
  }

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};
