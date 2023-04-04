import homeStyle from '../styles/Home.module.css';
import Button from '@/components/Button/Button';
import Layout from '@/components/Layout/Layout';

export default function Login() {
  return (
    <Layout>
      <form className={homeStyle.container__form}>
        <label>Login</label>
        <input type="login" />
        <label>Password</label>
        <input type="password" />
        <Button title="Login" />
      </form>
    </Layout>
  );
}
