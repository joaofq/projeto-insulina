import styles from './usercard.module.css';
import homeStyle from '../../styles/Home.module.css';

export default function UserCard(props) {
  return (
    <section className={homeStyle.card}>
      <h1> USUÁRIO</h1>
      <ul className={styles.usercard__list}>
        <li>Nome: {props.user.name}</li>
        <li>Idade: {props.user.idade}</li>
        <li>Incremento: {props.user.incremento}</li>
      </ul>
    </section>
  );
}
