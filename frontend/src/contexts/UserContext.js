import { createContext, use, useState } from 'react';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getUser(token) {
    const userDataRes = await fetch('http://localhost:8081/users/getUser', {
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
    let userData = await userDataRes.json();
    //setData(userData)
    //setLogin(true);
  }

  async function userLogin(email, password) {
    const data = await fetch('http://localhost:8081/users/login', {
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
    let userData = await data.json();
    if (data.status != 200) {
      return setUserData(userData.message);
    }
    window.localStorage.setItem('token', userData.token);
    setData(userData.user);
    setLogin(true);
  }

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};
