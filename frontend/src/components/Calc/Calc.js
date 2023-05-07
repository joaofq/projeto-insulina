import { useState, useEffect } from 'react';
import styles from './calc.module.css';
import homeStyle from '../../styles/Home.module.css';
import Button from '../Button/Button';

export default function Calc(props) {
  const [glicemia, setGlicemia] = useState('');
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    console.log(resultado);
  }, [resultado]);

  function insulinCalc() {
    if (glicemia == 0 || isNaN(glicemia) || glicemia == null) {
      setResultado('Erro! Digite corretamente');
    } else if (glicemia <= 100) {
      setResultado('Atenção! Comer!');
    } else if (glicemia > 100 && glicemia < 150) {
      setResultado('Aguarde para tomar os próximos passos');
    } else if (glicemia >= 150 && glicemia <= 200) {
      setResultado('tomar 1 unidade');
    } else {
      let unidadesInsulina = parseFloat((glicemia - 150) / 50).toPrecision(2);
      setResultado(`Tomar ${unidadesInsulina} unidades!`);
    }
  }

  function handleCalc(event) {
    event.preventDefault();
    insulinCalc();
    setGlicemia('');
  }

  return (
    <section className={homeStyle.card}>
      <h2 className={styles.calc__title}>CALCULADORA</h2>
      <form className={styles.calc__form} onSubmit={handleCalc}>
        <label> Glicemia: </label>
        <input
          type="number"
          className={styles.calc__input}
          value={glicemia}
          onChange={(e) => setGlicemia(e.target.value)}
        />
        <Button type="submit" title="Calcular" />
      </form>
      <div className={styles.calc__result}>Resultado: {resultado}</div>
      {/* Nome: {props.user.name} */}
    </section>
  );
}
