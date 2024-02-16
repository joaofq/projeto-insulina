import Calc from '@/components/Calc/Calc';
import Historico from '@/components/Historico/Historico';
import Layout from '@/components/Layout/Layout';
import Main from '@/components/Main/Main';
import UserCard from '@/components/UserCard/UserCard';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';

export default function dash() {
  const { data } = useContext(UserContext);
  console.log(data);

  return (
    <Layout>
      <Main>
        <UserCard user={data} />
        <Calc user={data} />
        <Historico user={data} />
      </Main>
    </Layout>
  );
}
