import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {
  Container, BoxLogo, Nav, LinkCustom,
} from './styles';
import logo from '~/assets/images/launch.png';

class Menu extends Component {
  state = {
    isActive: false,
  };

  render() {
    return (
      <Container>
        <BoxLogo>
          <img src={logo} alt="Meetups Show" />
        </BoxLogo>
        <Nav>
          <LinkCustom exact to="/">
            <i className="fa fa-home" aria-hidden="true" />
            Home
          </LinkCustom>
          <LinkCustom exact to="/categorias">
            <i className="fa fa-tags" aria-hidden="true" />
            Categorias
          </LinkCustom>
          <LinkCustom exact to="/sessoes">
            <i className="fa fa-ticket" aria-hidden="true" />
            Sessões
          </LinkCustom>
          <LinkCustom exact to="/produtos">
            <i className="fa fa-gift" aria-hidden="true" />
            Produtos
          </LinkCustom>
        </Nav>
      </Container>
    );
  }
}

export default Menu;
