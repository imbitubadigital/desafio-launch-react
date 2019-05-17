import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as auth } from '~/store/ducks/auth';
// import { reducer as user } from '~/store/ducks/user';

import { reducer as category } from '~/store/ducks/category';

import { reducer as toastr } from 'react-redux-toastr';

export default history => combineReducers({
  auth,
  toastr,
  category,
  router: connectRouter(history),
});
