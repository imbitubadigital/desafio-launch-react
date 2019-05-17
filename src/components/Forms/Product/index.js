import React, { useState, useEffect } from 'react';

import api from '~/services/api';
import Files from 'react-files';
import { toastr } from 'react-redux-toastr';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

// import PropTypes from 'prop-types';
// import moment from 'moment';
// import { Link } from 'react-router-dom';
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

export default function Product({ match }) {
  const { id } = match.params;
  const [initialData, setInitialData] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [status, setStatus] = useState(false);
  if (id) {
    useEffect(async () => {
      const { data } = await api.get(`/product/${id}`);
      setInitialData(data);
      setStatus(data.status);
    }, []);
  }

  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    const { data } = await api.get('/cat-form');
    setCategories(data);
  }, []);

  const [sections, setSections] = useState([]);

  useEffect(async () => {
    const { data } = await api.get('/section-form');
    setSections(data);
  }, []);

  async function handleSubmit(data) {
    try {
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

        setInitialData(product.data);
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
      setInitialData(product.data);
      return toastr.success('Tudo certo!', 'O produto foi atualizado com sucesso!');
    } catch (err) {
      return toastr.warning('Atenção', 'Erro ao realizar operação!');
    }
  }

  function handleFilesError(error) {
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
  }

  const [images, setImages] = useState([]);
  function handleFilesChange(files) {
    setImages(files);
  }

  async function upload() {
    try {
      setIsUpload(true);
      const dataForm = new FormData();
      images.map(file => dataForm.append('file', file, file.name));
      const configHeader = {
        headers: { 'content-type': 'multipart/form-data' },
      };

      await api.put(`/file/${initialData.file.id}`, dataForm, configHeader);
      setIsUpload(false);
    } catch (err) {
      setIsUpload(false);
      console.tron.log('DEU RUIM');
    }
  }

  return (
    <Container>
      <header>
        {initialData ? <h1>Atualizar Produto</h1> : <h1>Novo Produto</h1>}

        <a href="/produtos">
          <IconText className="fa fa-undo  " aria-hidden="true" />
          Voltar
        </a>
      </header>
      <BoxTable>
        <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
          <Input name="title" label="Título do Produto:" placeholder="Digite o título do produto" />
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
                  onChange={e => setStatus(e.target.checked)}
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
              onChange={handleFilesChange}
              onError={handleFilesError}
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
              <Button size="default" color="gray" onClick={upload}>
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
