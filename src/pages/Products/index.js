import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import api from '~/services/api';
// import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '~/styles/components/Button';
import { Link } from 'react-router-dom';
import noImage from '~/assets/images/noImage.png';
import {
  Container, BoxTable, Icon, IconText, TableCustom, Tth, Ttd, Info, BoxBtn,
} from './styles';

class Products extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    /*   const { categoryRequest } = this.props;
    categoryRequest(); */

    const { data } = await api.get('/product');
    this.setState({ data: data.data });
  }

  confimDel = (data) => {
    const toastrConfirmOptions = {
      onOk: () => this.delSection(data),
      onCancel: () => {},
      okText: 'Deletar',
      cancelText: 'Cancelar',
    };
    toastr.confirm('Deseja deletar este Produto?', toastrConfirmOptions);
  };

  delSection = async (deleted) => {
    try {
      const { data } = this.state;
      await api.delete(`/product/${deleted.id}`);

      this.setState({ data: data.filter(c => c.id !== deleted.id) });
    } catch (err) {
      return toastr.warning('Atenção', 'Erro no sistema ao realizar operação!');
    }
  };

  render() {
    const { data } = this.state;

    return (
      <Container>
        <header>
          <h1>Produtos</h1>
          <Link to="/produto">
            <IconText className="fa fa-plus-circle" aria-hidden="true" />
            Cadastrar
          </Link>
        </header>
        <BoxTable>
          <TableCustom>
            <thead>
              <tr>
                <Tth>IMAGEM</Tth>
                <Tth>PRODUTO</Tth>
                <Tth>CATEGORIA</Tth>
                <Tth>SESSÃO</Tth>
                <Tth>CRIADO EM</Tth>
                <Tth>
                  <BoxBtn>AÇÃO</BoxBtn>
                </Tth>
              </tr>
            </thead>
            <tbody>
              {!data && (
                <tr>
                  <Ttd colSpan="6">
                    <Info>Ainda não existem produtos cadastrados!</Info>
                  </Ttd>
                </tr>
              )}
              {data
                && data.map(prod => (
                  <tr key={prod.id}>
                    <Ttd>
                      <img
                        alt="Capa"
                        src={prod.file.url ? prod.file.url : noImage}
                        width={60}
                        height={40}
                      />
                    </Ttd>
                    <Ttd>{prod.title}</Ttd>
                    <Ttd>{prod.categories.name}</Ttd>
                    <Ttd>
                      {prod.sections.length > 0
                        && prod.sections.map(sec => <span key={sec.id}>{sec.name}</span>)}
                    </Ttd>
                    <Ttd>{moment(prod.created_at).format('DD/MM/YYYY HH:mm')}</Ttd>
                    <Ttd>
                      <BoxBtn>
                        <Link to={`/produto/${prod.id}`}>
                          <Icon className="fa fa-pencil" aria-hidden="true" />
                        </Link>
                        <Button size="default" color="danger" onClick={() => this.confimDel(prod)}>
                          <Icon className="fa fa-trash" aria-hidden="true" />
                        </Button>
                      </BoxBtn>
                    </Ttd>
                  </tr>
                ))}
            </tbody>
          </TableCustom>
        </BoxTable>
      </Container>
    );
  }
}

export default Products;
