import { createContext, useState, useEffect, use } from 'react';
import api from '../pages/api/api';
import { useRouter } from 'next/router';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setLogin(true);
      api.setToken(token);
      api.getUserInfo().then((userData) => setData(userData));
    } else {
      console.log('Usuário não registrado!');
    }
  }, []);

  function logoff() {
    setLogin(false);
    setData(false);
    window.localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider
      value={{ data, setData, login, setLogin, setLogin, logoff }}
    >
      {children}
    </UserContext.Provider>
  );
};
