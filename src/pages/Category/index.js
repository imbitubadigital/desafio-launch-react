import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import CategoryActions from '~/store/ducks/category';
import Button from '~/styles/components/Button';
import {
  Container,
  BoxTable,
  Icon,
  IconText,
  TableCustom,
  Tth,
  Ttd,
  Info,
  BoxBtn,
  BoxModal,
  BtnClose,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Por favor preencha o nome da categoria!'),
});

class Category extends Component {
  static propTypes = {
    categoryRequest: PropTypes.func.isRequired,
    createUpdateCategoryRequest: PropTypes.func.isRequired,
    deleteCategoryRequest: PropTypes.func.isRequired,
    category: PropTypes.shape({
      loader: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          created_at: PropTypes.date,
        }),
      ),
    }).isRequired,
  };

  state = {
    visible: false,
    initialData: null,
  };

  componentDidMount() {
    const { categoryRequest } = this.props;
    categoryRequest();
  }

  catNew = () => {
    this.setState({ initialData: null, visible: true });
  };

  catEdit = (cat) => {
    this.setState({ visible: true, initialData: cat });
  };

  closeModal = () => {
    this.setState({
      visible: false,
      initialData: null,
    });
  };

  handleSubmit = (data) => {
    const { initialData } = this.state;
    const { createUpdateCategoryRequest } = this.props;
    const id = initialData ? initialData.id : null;
    createUpdateCategoryRequest(id, data);

    this.setState({
      initialData: null,
      visible: false,
    });
  };

  delCategory = (data) => {
    const { deleteCategoryRequest } = this.props;
    const toastrConfirmOptions = {
      onOk: () => deleteCategoryRequest(data),
      onCancel: () => {},
      okText: 'Deletar',
      cancelText: 'Cancelar',
    };
    toastr.confirm('Deseja deletar esta Categoria?', toastrConfirmOptions);
  };

  render() {
    const { visible, initialData } = this.state;
    const {
      category: { data },
    } = this.props;

    return (
      <Container>
        <header>
          <h1>Categorias</h1>
          <Button type="button" color="green" size="big" onClick={() => this.catNew()}>
            <IconText className="fa fa-plus-circle" aria-hidden="true" />
            Cadastrar
          </Button>
        </header>
        <BoxTable>
          <TableCustom>
            <thead>
              <tr>
                <Tth>CATEGORIAS</Tth>
                <Tth>SLUG</Tth>
                <Tth>CRIADO EM</Tth>
                <Tth>
                  <BoxBtn>AÇÃO</BoxBtn>
                </Tth>
              </tr>
            </thead>
            <tbody>
              {!data && (
                <tr>
                  <Ttd colSpan="3">
                    <Info>Ainda não existem categorias cadastradas!</Info>
                  </Ttd>
                </tr>
              )}
              {data
                && data.map(cat => (
                  <tr key={cat.id}>
                    <Ttd>{cat.name}</Ttd>
                    <Ttd>{cat.slug}</Ttd>
                    <Ttd>{moment(cat.created_at).format('DD/MM/YYYY HH:mm')}</Ttd>
                    <Ttd>
                      <BoxBtn>
                        <Button size="default" onClick={() => this.catEdit(cat)}>
                          <Icon className="fa fa-pencil" aria-hidden="true" />
                        </Button>
                        <Button size="default" color="danger" onClick={() => this.delCategory(cat)}>
                          <Icon className="fa fa-trash" aria-hidden="true" />
                        </Button>
                      </BoxBtn>
                    </Ttd>
                  </tr>
                ))}
            </tbody>
          </TableCustom>
        </BoxTable>
        <Modal
          visible={visible}
          width="400"
          height="250"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <BoxModal>
            {initialData ? <h1>Atualizar Categoria</h1> : <h1>Cadastrar Categoria</h1>}

            <Form
              initialData={initialData}
              schema={schema}
              onSubmit={data => this.handleSubmit(data)}
            >
              <div>
                <Input
                  name="name"
                  label="Nome da Categoria:"
                  placeholder="Digite o nome da categoria"
                />
              </div>
              <Button type="submit" size="default">
                Salvar
              </Button>
            </Form>

            <BtnClose type="button" onClick={() => this.closeModal()}>
              <Icon className="fa fa-close" aria-hidden="true" />
            </BtnClose>
          </BoxModal>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category,
});
const mapDispatchToProps = dispatch => bindActionCreators(CategoryActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Category);
