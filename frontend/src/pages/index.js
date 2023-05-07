import Layout from '@/components/Layout/Layout';
import styles from '../styles/Home.module.css';
import Main from '@/components/Main/Main';

export default function Home() {
  return (
    <Layout home>
      <section className={styles.intro}>
        <Main>
          <h1>
            Projeto Insulida foi desenvolvido para fins de teste e estudos. Não
            deve ser utilizado para controlar sua diabete, salvo expressamente
            recomendado por seu médico!
          </h1>
        </Main>
      </section>
    </Layout>
  );
}
