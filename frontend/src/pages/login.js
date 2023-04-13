import homeStyle from '../styles/Home.module.css';
import Button from '@/components/Button/Button';
import Layout from '@/components/Layout/Layout';

function handleSubmit(event) {
  event.preventDefault();
  const email = event.target.elements.email.value;
  const password = event.target.elements.password.value;
  getUserInfo(email, password);
}

export async function getUserInfo(email, password) {
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

  const usuario = await data.json();
  console.log(usuario.email);
  console.log(usuario.password);
  console.log(usuario.name);
  console.log(usuario.idade);
}

export default function Login() {
  return (
    <Layout>
      <form className={homeStyle.container__form} onSubmit={handleSubmit}>
        <label>Login</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <Button title="Login" type="submit" />
      </form>
    </Layout>
  );
}
