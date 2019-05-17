import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  categoryRequest: null,
  createUpdateCategoryRequest: ['id', 'name'],
  categorySuccess: ['data'],
  categoryFailure: null,
  createCategorySuccess: ['data'],
  updateCategorySuccess: ['data'],
  deleteCategoryRequest: ['data'],
  deleteCategorySuccess: ['data'],
});

export const CategoryTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  data: [],
  loader: false,
});

/* Reducers */
export const setLoaderTrue = state => state.merge({ loader: true });
export const setLoaderFalse = state => state.merge({ loader: false });
export const success = (state, { data }) => state.merge({
  loader: false,
  data,
});
export const createSuccess = (state, { data }) => state.merge({
  loader: false,
  data: [data, ...state.data],
});
export const updateSuccess = (state, { data }) => state.merge({
  loader: false,
  data: state.data.map(c => (c.id === data.id ? data : c)),
});
export const deleteSuccess = (state, { data }) => state.merge({
  loader: false,
  data: state.data.filter(c => c.id !== data.id),
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_REQUEST]: setLoaderTrue,
  [Types.CREATE_UPDATE_CATEGORY_REQUEST]: setLoaderTrue,
  [Types.CATEGORY_SUCCESS]: success,
  [Types.CATEGORY_FAILURE]: setLoaderFalse,
  [Types.UPDATE_CATEGORY_SUCCESS]: updateSuccess,
  [Types.CREATE_CATEGORY_SUCCESS]: createSuccess,
  [Types.DELETE_CATEGORY_REQUEST]: setLoaderTrue,
  [Types.DELETE_CATEGORY_SUCCESS]: deleteSuccess,
});
