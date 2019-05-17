import { all, takeLatest } from 'redux-saga/effects';

import { requestCategory, createUpdateCategory, deleteCategory } from './category';
import { CategoryTypes } from '~/store/ducks/category';

export default function* rootSaga() {
  return yield all([
    takeLatest(CategoryTypes.CATEGORY_REQUEST, requestCategory),
    takeLatest(CategoryTypes.CREATE_UPDATE_CATEGORY_REQUEST, createUpdateCategory),
    takeLatest(CategoryTypes.DELETE_CATEGORY_REQUEST, deleteCategory),
  ]);
}
