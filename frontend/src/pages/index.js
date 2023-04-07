import Layout from '@/components/Layout/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout home>
      <section className={styles.intro}>
        <h1>
          Projeto Insulida foi desenvolvido para fins de teste e estudos. Não
          deve ser utilizado para controlar sua diabete, salvo expressamente
          recomendado por seu médico!
        </h1>
      </section>
    </Layout>
  );
}
