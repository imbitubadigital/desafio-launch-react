import React, { Component } from 'react';

import api from '~/services/api';
import Files from 'react-files';
import { toastr } from 'react-redux-toastr';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import PropTypes from 'prop-types';
// import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import Button from '~/styles/components/Button';
import ReactSelect from '~/components/ReactSelect';
import DatePicker from '~/components/DatePicker';
import {
  Container,
  BoxTable,
  IconText,
  BoxSelect,
  ItemSelect,
  LabelCustom,
  Box,
  Box2,
  BoxStatus,
  DivButton,
  BoxImage,
  Image,
  BoxDrop,
  Drop,
  BoxLoad,
  TextLoad,
} from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Informe o título do produto!'),
  subtitle: Yup.string().required('Informe o subtítulo do produto!'),
  category_id: Yup.string().required('Selecione uma categoria!'),
  sections: Yup.array().required('Selecione uma sessão!'),
  description: Yup.string().required('Informe a descrição do produto!'),
  stock: Yup.number().typeError('Informe a quantidade em estoque!'),
  price: Yup.number()
    .typeError('Por favor informe o preço do produto!')
    .positive('O preço do produto deve ser um númvalorero positivo!')
    .required('Por favor informe o preço do Produto!'),
  /*  status: Yup.boolean(), */
  public_date: Yup.date().default(() => new Date()),
});

export default class Product extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
  };

  state = {
    // id: null,
    initialData: null,
    isUpload: false,
    status: false,
    categories: [],
    sections: [],
    images: [],
  };

  async componentDidMount() {
    const { match } = this.props;

    // this.setState({ id: match.params.id });

    // console.tron.log('aaa', match.params.id);
    if (match.params.id) {
      const { data } = await api.get(`/product/${match.params.id}`);
      console.tron.log('trommm', data);
      this.setState({ initialData: data, status: data.status });
    }
    const categories = await api.get('/cat-form');
    this.setState({ categories: categories.data });

    const sections = await api.get('/section-form');
    this.setState({ sections: sections.data });
  }

  handleSubmit = async (data) => {
    // console.tron.log('submit', data);
    try {
      const { initialData } = this.state;
      const {
        public_date,
        price,
        stock,
        description,
        sections,
        category_id,
        subtitle,
        title,
        status,
      } = data;

      if (!initialData) {
        const product = await api.post('/product', {
          public_date,
          price,
          stock,
          description,
          sections,
          category_id,
          subtitle,
          title,
          status,
        });

        this.setState({ initialData: product.data });
        return toastr.success(
          'Tudo certo!',
          'O produto foi cadastrado com sucesso. Por favor envie uma imagem de capa!',
        );
      }
      const product = await api.put(`/product/${initialData.id}`, {
        public_date,
        price,
        stock,
        description,
        sections,
        category_id,
        subtitle,
        title,
        status,
      });
      this.setState({ initialData: product.data });
      return toastr.success('Tudo certo!', 'O produto foi atualizado com sucesso!');
    } catch (err) {
      return toastr.warning('Atenção', 'Erro ao realizar operação!');
    }
  };

  handleFilesError = (error) => {
    switch (error.code) {
      case 1:
        return toastr.warning('Atenção', 'Tipo de arquivo inválido!');
      case 2:
        return toastr.warning('Atenção', 'Arquivo muito grande!');
      case 3:
        return toastr.warning('Atenção', 'Arquivo muito pequeno!');
      case 4:
        return toastr.warning('Atenção', 'Selecione uma imagem!');
      default:
        return false;
    }
  };

  handleFilesChange = (files) => {
    this.setState({ images: files });
  };

  upload = async () => {
    try {
      const { images, initialData } = this.state;
      this.setState({ isUpload: true });

      const dataForm = new FormData();
      images.map(file => dataForm.append('file', file, file.name));
      const configHeader = {
        headers: { 'content-type': 'multipart/form-data' },
      };

      await api.put(`/file/${initialData.file.id}`, dataForm, configHeader);
      this.setState({ isUpload: false });
    } catch (err) {
      this.setState({ isUpload: false });
      console.tron.log('DEU RUIM');
    }
  };

  render() {
    const {
      initialData, categories, sections, status, images, isUpload,
    } = this.state;
    return (
      <Container>
        <header>
          {initialData ? <h1>Atualizar Produto</h1> : <h1>Novo Produto</h1>}

          <NavLink to="/produtos">
            <IconText className="fa fa-undo" aria-hidden="true" />
            Voltar
          </NavLink>
        </header>
        <BoxTable>
          <Form schema={schema} initialData={initialData} onSubmit={this.handleSubmit}>
            <Input
              name="title"
              label="Título do Produto:"
              placeholder="Digite o título do produto"
            />
            <Input
              name="subtitle"
              label="Subtítulo do Produto:"
              placeholder="Digite uma breve descrição"
            />
            <BoxSelect>
              <ItemSelect>
                <ReactSelect label="Categoria:" name="category_id" options={categories} />
              </ItemSelect>
              <ItemSelect>
                <ReactSelect label="Sessão:" name="sections" multiple options={sections} />
              </ItemSelect>
            </BoxSelect>

            <Textarea label="Descrição:" name="description" rows={5} />
            <Box>
              <Box2>
                <Input name="price" label="Preço do Produdo:" placeholder="Digite o preço" />
              </Box2>
              <Box2>
                <Input
                  name="stock"
                  label="Qdt em Estoque:"
                  placeholder="Digite a quantidade"
                  type="number"
                  min={0}
                />
              </Box2>
            </Box>
            <Box>
              <Box2>
                <LabelCustom>Data de Publição:</LabelCustom>
                <DatePicker name="public_date" />
              </Box2>
              <Box2>
                <LabelCustom>Status:</LabelCustom>
                <BoxStatus>
                  <Input
                    label={status ? 'Ativo' : 'Inativo'}
                    type="checkbox"
                    name="status"
                    checked={initialData && initialData.status}
                    onChange={e => this.setState({ status: e.target.checked })}
                  />
                </BoxStatus>
              </Box2>
            </Box>
            <DivButton>
              <Button type="submit" size="default">
                Salvar
              </Button>
            </DivButton>
          </Form>
          {initialData && (
            <BoxImage>
              <Files
                className="files-dropzone"
                onChange={this.handleFilesChange}
                onError={this.handleFilesError}
                accepts={['image/png', 'image/jpg', '.jpg']}
                maxFiles={1}
                multiple={false}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
              >
                <BoxDrop>
                  {images.length > 0 ? (
                    images.map(img => (
                      <div key={img.preview.url}>
                        <Image img={img.preview.url} />
                      </div>
                    ))
                  ) : (
                    <>
                      {initialData && initialData.file.url ? (
                        <div key={initialData.file}>
                          <Image img={initialData.file.url} />
                        </div>
                      ) : (
                        <>
                          <Drop>
                            <i className="fa fa-camera" aria-hidden="true" />
                            Selecione uma imagem
                          </Drop>
                        </>
                      )}
                    </>
                  )}
                  {isUpload && (
                    <BoxLoad>
                      <i className="fa fa-refresh" aria-hidden="true" />
                      <TextLoad>Aguarde! Enviando arquivo!</TextLoad>
                    </BoxLoad>
                  )}
                </BoxDrop>
              </Files>
              <DivButton>
                <Button size="default" color="gray" onClick={this.upload}>
                  <IconText className="fa fa-upload" aria-hidden="true" />
                  Enviar imagem
                </Button>
              </DivButton>
            </BoxImage>
          )}
        </BoxTable>
      </Container>
    );
  }
}
