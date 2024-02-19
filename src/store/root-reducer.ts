import { combineReducers } from 'redux';
import keyworder from './reducer/keyworder';

const rootReducer = combineReducers({
  keyworder,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
