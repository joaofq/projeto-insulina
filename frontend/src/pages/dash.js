import Layout from '@/components/Layout/Layout';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';

export default function dash() {
  const { data } = useContext(UserContext);
  console.log(data);

  return (
    <Layout>
      <h1> Exibição de infos</h1>
      <ul>
        <li>Nome: {data.name}</li>
        <li>Idade: {data.idade}</li>
        <li>Incremento: {data.incremento}</li>
      </ul>
    </Layout>
  );
}
