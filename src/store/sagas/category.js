import { call, put } from 'redux-saga/effects';
// import { push } from 'connected-react-router';
import api from '~/services/api';
import { actions as toastrActions } from 'react-redux-toastr';

import CategoryActions from '~/store/ducks/category';

export function* requestCategory() {
  try {
    const response = yield call(api.get, 'category');

    yield put(CategoryActions.categorySuccess(response.data));
  } catch (err) {
    yield put(CategoryActions.categoryFailure());
    if (err.response.request.status === 400) {
      yield put(
        toastrActions.add({
          type: 'warning',
          title: 'Atenção!',
          message: err.response.data[0].message,
          options: {
            timeOut: 10000,
            progressBar: true,
            closeOnToastrClick: true,
          },
        }),
      );
    } else {
      yield put(
        toastrActions.add({
          type: 'error',
          title: 'Opps',
          message: 'Erro no sistema ao realizar o cadastro!',
          options: {
            timeOut: 10000,
            progressBar: true,
            closeOnToastrClick: true,
          },
        }),
      );
    }
  }
}

export function* createUpdateCategory({ id, name }) {
  try {
    if (id) {
      const response = yield call(api.put, `category/${id}`, { name: name.name });
      yield put(CategoryActions.updateCategorySuccess(response.data));
    } else {
      const response = yield call(api.post, 'category', { name: name.name });
      yield put(CategoryActions.createCategorySuccess(response.data));
    }

    const msg = id
      ? 'A Categoria foi atualizada com sucesso!'
      : 'A Categoria foi cadastrada com sucesso!';

    yield put(
      toastrActions.add({
        type: 'info',
        title: 'Tudo Certo!',
        message: msg,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }),
    );
  } catch (err) {
    yield put(CategoryActions.categoryFailure());
    if (err.response.request.status === 400) {
      yield put(
        toastrActions.add({
          type: 'warning',
          title: 'Atenção!',
          message: err.response.data.error.message,
          options: {
            timeOut: 10000,
            progressBar: true,
            closeOnToastrClick: true,
          },
        }),
      );
    } else {
      yield put(
        toastrActions.add({
          type: 'error',
          title: 'Opps',
          message: 'Erro no sistema ao realizar o cadastro!',
          options: {
            timeOut: 10000,
            progressBar: true,
            closeOnToastrClick: true,
          },
        }),
      );
    }
  }
}

export function* deleteCategory({ data }) {
  try {
    yield call(api.delete, `category/${data.id}`);
    yield put(CategoryActions.deleteCategorySuccess(data));
  } catch (err) {
    yield put(CategoryActions.categoryFailure());
    if (err.response.status === 400) {
      yield put(
        toastrActions.add({
          type: 'warning',
          title: 'Atenção!',
          message: err.response.data.error.message,
          options: {
            timeOut: 10000,
            progressBar: true,
            closeOnToastrClick: true,
          },
        }),
      );
    } else {
      yield put(
        toastrActions.add({
          type: 'error',
          title: 'Opps',
          message: 'Erro no sistema ao realizar o cadastro!',
          options: {
            timeOut: 10000,
            progressBar: true,
            closeOnToastrClick: true,
          },
        }),
      );
    }
  }
}
