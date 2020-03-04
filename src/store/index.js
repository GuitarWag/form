import { createStore, combineReducers } from 'redux';
import courses from './courses'
import students from './students'

const reducer = combineReducers({
  courses,
  students,
})
export default createStore(
  reducer,
);
