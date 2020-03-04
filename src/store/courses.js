import { useDispatch, useSelector } from 'react-redux';
import { includes, filter } from 'lodash';

export const ADD = 'courses/ADD';
export const SELECT = 'courses/SELECT';
export const UNSELECT = 'courses/UNSELECT';

const initialCourses = [
  'css',
  'javascript',
  'html',
  'python',
  'java',
  'go',
  'C##',
  'lua',
  'git',
  'ci/cd',
];
const initialState = {
  list: initialCourses,
  selected: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case SELECT:
      return {
        ...state,
        selected: [...state.selected, action.payload],
      };
    case UNSELECT:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  add: (payload) => ({
    type: ADD,
    payload,
  }),
  select: (payload) => ({
    type: SELECT,
    payload,
  }),
  unselect: (payload) => ({
    type: UNSELECT,
    payload,
  }),
};

export const Selectors = {
  courses: (state) => state.courses.list,
  selected: (state) => state.courses.selected,
};

export const useCourses = () => useSelector(Selectors.courses);
export const useSelectedCourses = () => useSelector(Selectors.selected);

export const useAddCourse = () => {
  const dispatch = useDispatch();
  const courses = useCourses();
  return (newCourse) => {
    if (!includes(courses, newCourse) || newCourse === '') {
      return dispatch(Creators.add(newCourse));
    }
    return null;
  };
};

export const useSelectCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelectedCourses();
  return (newCourse) => {
    if (!includes(courses, newCourse)) {
      return dispatch(Creators.select(newCourse));
    }
    return null;
  };
};

export const useUnselectCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelectedCourses();
  return (newCourse) => {
    if (includes(courses, newCourse)) {
      const newSelected = filter(courses, (c) => c !== newCourse);
      return dispatch(Creators.unselect(newSelected));
    }
    return null;
  };
};
