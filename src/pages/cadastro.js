import Button from '../components/Button/Button';
import homeStyle from '../styles/Home.module.css';
import Layout from '@/components/Layout/Layout';

export default function Cadastro() {
  return (
    <Layout>
      <form className={homeStyle.container__form}>
        <label>Nome</label>
        <input type="text" />
        <label>Data de nascimento</label>
        <input type="date" />
        <label>Incremento insulina</label>
        <input type="number" />
        <label>E-mail</label>
        <input type="email" />
        <label>Password</label>
        <input type="password" />
        <Button title="Cadastrar" />
      </form>
    </Layout>
  );
}
