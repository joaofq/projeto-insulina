import homeStyle from '../styles/Home.module.css';
import Button from '@/components/Button/Button';
import Layout from '@/components/Layout/Layout';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/router';

import api from '../pages/api/api';

export default function Login() {
  const { setLogin, setData, data } = useContext(UserContext);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
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

  return (
    <Layout>
      <form className={homeStyle.container__form} onSubmit={handleSubmit}>
        <label>Login</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <Button title="Login" type="submit" />
      </form>
      <h2>{data && data.name}</h2>
    </Layout>
  );
}
