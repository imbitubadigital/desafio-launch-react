import React from 'react';

import {
  Container, Info, Title, Item,
} from './styles';

const Home = () => (
  <Container>
    <header>
      <h1>Desafio Launch</h1>
    </header>
    <Info>Utilize os menus ao lado para conferir o desafio!</Info>
    <Info>01 - CATEGORIA - gestão utilizando o unform + redux e saga</Info>
    <Info>
      02 - SESSÕES - gestão utilizando o unform + Stateless component fazendo chamada a api no
      próprio component
    </Info>
    <Info>03 - PRODUTOS - O Formulário de cadastro utilizando hooks</Info>
    <Title>Problemas não solucionados:</Title>
    <Item>
      01: O
      {' '}
      <b>resetForm()</b>
      {' '}
não funcionou nas CATEGORIAS e SESSÕES não sei se pelo fato de estar
      utilizando modal ou components que não são Hooks.
    </Item>
    <Item>
      02: Os components
      {' '}
      <b>Select, Datapiker e Textearea</b>
      {' '}
não funcionaram no momento do update,
      ou seja, não carregam os respectivos dados já cadastrados no momento da atualização.
    </Item>
    <Item>
      03: Não consegui utilizar o component
      {' '}
      <b>Ckeckbox</b>
      {' '}
talvez por não saber integrá-lo no Yup,
      pois mesmo marcado ou não, ficava impedindo o submit.
    </Item>
    <Item>
      04: Não é um problema exatamente do unform, mais tive problema com a navegação, ou seja, após
      acessar o formulário dos produtos, ao clicar no menu lateral a reapctiva página não é
      carregada, inclusive fiz uma gambiarra no botão voltar para conseguir terminar de integrar.
    </Item>
    <Title>Ficarei imensamento grato se conseguir me ajudar com os problemas citados acima.</Title>
  </Container>
);

export default Home;
