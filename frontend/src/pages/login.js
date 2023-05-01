import homeStyle from '../styles/Home.module.css';
import Button from '@/components/Button/Button';
import Layout from '@/components/Layout/Layout';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';

export default function Login() {
  const { userLogin, data } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    await userLogin(email, password);
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
