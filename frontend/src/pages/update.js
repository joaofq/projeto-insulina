import Button from '../components/Button/Button';
import homeStyle from '../styles/Home.module.css';
import Layout from '@/components/Layout/Layout';
import api from './api/api';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserContext';

export default function Update() {
  const { data, setData, logoff } = useContext(UserContext);
  const router = useRouter();
  const [userName, setUserName] = useState(data.name);
  const [idade, setIdade] = useState(data.idade);
  const [incremento, setIncremento] = useState(data.incremento);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(undefined);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    api.setToken(token);
    try {
      const userData = await api.updateUser(
        userName,
        idade,
        incremento,
        email,
        password,
      );
      setData(userData);
      router.push('/dash');
    } catch (error) {
      console.log('Erro: ' + error);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await api.deleteUser();
      logoff();
      router.push('/');
    } catch (error) {
      console.log('Erro: ' + error);
    }
  }

  return (
    <Layout>
      <button type="button" title="Deletar Conta" onClick={handleDelete}>
        deletar
      </button>
      <form className={homeStyle.container__form} onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Idade</label>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <label>Incremento insulina</label>
        <input
          type="number"
          value={incremento}
          onChange={(e) => setIncremento(e.target.value)}
        />
        <label>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Atualizar" type="submit" />
      </form>
    </Layout>
  );
}
