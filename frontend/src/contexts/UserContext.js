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

  async function userLogin(email, password) {
    try {
      await api.authenticate(email, password);
      setLogin(true);
      const userData = await api.getUserInfo();
      setData(userData);
      if (userData) {
        router.push('/dash');
      }
    } catch (error) {
      console.log('Erro de autenticação: ' + error);
    }
  }

  function logoff() {
    setLogin(false);
    setData(false);
    window.localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider
      value={{ userLogin, data, setData, login, setLogin, setLogin, logoff }}
    >
      {children}
    </UserContext.Provider>
  );
};
