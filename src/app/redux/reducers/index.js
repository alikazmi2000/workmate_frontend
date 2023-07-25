import { combineReducers } from 'redux';
import counterReducer from './counter';
import userReducer from './user';
import jobReducer from './jobs';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  job:jobReducer,
});

export default rootReducer;