import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import api from '~/services/api';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Modal from 'react-awesome-modal';
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

class Section extends Component {
  static propTypes = {};

  state = {
    visible: false,
    initialData: null,
    data: null,
  };

  async componentDidMount() {
    const { data } = await api.get('/section');
    this.setState({ data });
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

  handleSubmit = async ({ name }) => {
    try {
      const { initialData, data } = this.state;
      if (initialData) {
        const up = await api.put(`/section/${initialData.id}`, { name });
        this.setState({
          initialData: null,
          visible: false,
          data: data.map(c => (c.id === up.data.id ? up.data : c)),
        });
      } else {
        const up = await api.post('/section', { name });
        this.setState({
          initialData: null,
          visible: false,
          data: [up.data, ...data],
        });
      }
    } catch (err) {
      if (err.response.status === 400) {
        return toastr.warning('Atenção', err.response.data[0].message);
      }
      return toastr.warning('Atenção', 'Erro no sistema ao realizar operação!');
    }
  };

  confimDel = (data) => {
    const toastrConfirmOptions = {
      onOk: () => this.delSection(data),
      onCancel: () => {},
      okText: 'Deletar',
      cancelText: 'Cancelar',
    };
    toastr.confirm('Deseja deletar esta Categoria?', toastrConfirmOptions);
  };

  delSection = async (deleted) => {
    try {
      const { data } = this.state;
      await api.delete(`/section/${deleted.id}`);
      this.setState({ data: data.filter(c => c.id !== deleted.id) });
    } catch (err) {
      if (err.response.status === 400) {
        return toastr.warning('Atenção', err.response.data.error.message);
      }
      return toastr.warning('Atenção', 'Erro no sistema ao realizar operação!');
    }
  };

  render() {
    const { visible, initialData, data } = this.state;

    return (
      <Container>
        <header>
          <h1>Sessões</h1>
          <Button type="button" color="green" size="big" onClick={() => this.catNew()}>
            <IconText className="fa fa-plus-circle" aria-hidden="true" />
            Cadastrar
          </Button>
        </header>
        <BoxTable>
          <TableCustom>
            <thead>
              <tr>
                <Tth>SESSÕES</Tth>
                <Tth>SLUG</Tth>
                <Tth>PRODUTOS</Tth>
                <Tth>CRIADO EM</Tth>
                <Tth>
                  <BoxBtn>AÇAO</BoxBtn>
                </Tth>
              </tr>
            </thead>
            <tbody>
              {!data && (
                <tr>
                  <Ttd colSpan="4">
                    <Info>Ainda não existem sessões cadastradas!</Info>
                  </Ttd>
                </tr>
              )}
              {data
                && data.map(ses => (
                  <tr key={ses.id}>
                    <Ttd>{ses.name}</Ttd>
                    <Ttd>{ses.slug}</Ttd>
                    <Ttd>{ses.products.length}</Ttd>
                    <Ttd>{moment(ses.created_at).format('DD/MM/YYYY HH:mm')}</Ttd>
                    <Ttd>
                      <BoxBtn>
                        <Button size="default" onClick={() => this.catEdit(ses)}>
                          <Icon className="fa fa-pencil" aria-hidden="true" />
                        </Button>
                        <Button size="default" color="danger" onClick={() => this.confimDel(ses)}>
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
            {initialData ? <h1>Atualizar Sessão</h1> : <h1>Cadastrar Sessão</h1>}

            <Form
              initialData={initialData}
              schema={schema}
              onSubmit={data => this.handleSubmit(data)}
            >
              <div>
                <Input name="name" label="Nome da Sessão:" placeholder="Digite o nome da Sessão" />
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

export default Section;
