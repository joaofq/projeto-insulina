import homeStyle from '../styles/Home.module.css';
import Button from '@/components/Button/Button';
import Layout from '@/components/Layout/Layout';
import { useState } from 'react';

export default function Login() {
  const [userData, setUserData] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    getUserInfo(email, password);
  }

  async function getUserInfo(email, password) {
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
    let usuario = await data.json();
    if (data.status != 200) {
      return setUserData(usuario.message);
    }
    return setUserData(` Token: ${usuario.token}`);
  }

  return (
    <Layout>
      <form className={homeStyle.container__form} onSubmit={handleSubmit}>
        <label>Login</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <Button title="Login" type="submit" />
      </form>
      <h2>{userData}</h2>
    </Layout>
  );
}
