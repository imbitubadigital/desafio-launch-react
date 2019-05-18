import React from 'react';

import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from './history';

import Guest from './guest';
import 'font-awesome/css/font-awesome.css';

import Menu from '~/components/Menu/';
import Home from '~/pages/Home/';
import Category from '~/pages/Category/';
import Section from '~/pages/Section/';
import Products from '~/pages/Products/';
import Product from '~/components/Forms/Product/index';
import {
  Container, BoxMenu, BoxRight, BoxTop, BoxCenter,
} from './styles';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Container>
      <BoxMenu>
        <Menu />
      </BoxMenu>
      <BoxRight>
        <BoxTop />
        <BoxCenter>
          <Switch>
            <Guest exact path="/" component={Home} />
            <Guest path="/categorias" component={Category} />
            <Guest path="/sessoes" component={Section} />
            <Guest path="/produtos" component={Products} />
            <Guest path="/produto/:id" component={Product} />
            <Guest path="/produto/" component={Product} />
          </Switch>
        </BoxCenter>
      </BoxRight>
    </Container>
  </ConnectedRouter>
);

export default Routes;
