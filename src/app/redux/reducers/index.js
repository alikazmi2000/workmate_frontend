import { combineReducers } from 'redux';
import counterReducer from './counter';
import userReducer from './user';
import jobReducer from './jobs';
import bidReducer from './bids';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  job:jobReducer,
  bid:bidReducer,
});

export default rootReducer;