import { combineReducers } from 'redux';
import workouts from './modules/workouts/reducer';
import general from './modules/general/reducer';

export default combineReducers({
  workouts,
  general
});
