import Button from '../components/Button/Button';
import homeStyle from '../styles/Home.module.css';
import Layout from '@/components/Layout/Layout';
import api from './api/api';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserContext';

export default function Cadastro() {
  const [userName, setUserName] = useState('');
  const [idade, setIdade] = useState('');
  const [incremento, setIncremento] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userLogin, data } = useContext(UserContext);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userData = await api.createUser(
        userName,
        idade,
        incremento,
        email,
        password,
      );
      userLogin(email, password);
    } catch (error) {
      console.log('Pau: ' + error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const userData = await api.updateUser(
        userName,
        idade,
        incremento,
        email,
        password,
      );
      // userLogin(email, password);
    } catch (error) {
      console.log('Pau: ' + error);
    }
  }

  return (
    <Layout>
      <form
        className={homeStyle.container__form}
        onSubmit={data ? handleUpdate : handleSubmit}
      >
        <label>Nome</label>
        <input
          type="text"
          value={data ? data.name : userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Idade</label>
        <input
          type="number"
          value={data ? data.idade : idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <label>Incremento insulina</label>
        <input
          type="number"
          value={data ? data.incremento : incremento}
          onChange={(e) => setIncremento(e.target.value)}
        />
        <label>E-mail</label>
        <input
          type="email"
          value={data ? data.email : email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title={data ? 'Atualizar' : 'Cadastrar'} type="submit" />
      </form>
    </Layout>
  );
}
