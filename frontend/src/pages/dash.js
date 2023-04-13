export async function getStaticProps() {
  const data = await fetch('http://localhost:8081/users/login', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email: 'nando@ig.com.br',
      password: 'nando',
    }),
  });

  const usuarios = await data.json();
  return {
    props: { usuarios },
  };
}

export default function dash({ usuarios }) {
  return (
    <>
      <h1> Exibição de infos</h1>
      <ul>
        <li>Nome: {usuarios.name}</li>
        <li>Idade: {usuarios.idade}</li>
        <li>Incremento: {usuarios.incremento}</li>
      </ul>
    </>
  );
}
