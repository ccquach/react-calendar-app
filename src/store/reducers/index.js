import { combineReducers } from 'redux';
import reminders from './reminders';
import modals from './modals';

const rootReducer = combineReducers({
  reminders,
  modals
});

export default rootReducer;
