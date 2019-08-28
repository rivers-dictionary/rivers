import { combineReducers } from 'redux';
import words from './words';
import dictionaries from './dictionaries';
import definations from './definations';
import auth from './auth';


export default combineReducers({
  auth,
  words,
  dictionaries,
  definations,
})
