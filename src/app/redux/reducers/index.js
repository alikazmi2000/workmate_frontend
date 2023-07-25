import { combineReducers } from 'redux';
import counterReducer from './counter';
import userReducer from './user';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export default rootReducer;