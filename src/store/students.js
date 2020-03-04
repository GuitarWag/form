import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

export const ADD = 'students/ADD';

const initialStudents = [
  {
    _id: 24153,
    name: 'John Wayne',
    age: 20,
    address: '26 Avenue, CBABS, FLE',
    state: 'Arkansas',
    gender: 'male',
    courses: [
      'css', 'javascript', 'html', 'python', 'go',
    ],
  },
  {
    _id: 24152,
    name: 'John Silva',
    age: 19,
    address: '26 Avenue, CBABS, FLE',
    state: 'Arkansas',
    gender: 'male',
    courses: [
      'css', 'javascript', 'html', 'python', 'go',
    ],
  },
  {
    _id: 24452,
    name: 'Bob Silva',
    age: 19,
    address: '26 Avenue, CBABS, FLE',
    state: 'Arkansas',
    gender: 'male',
    courses: [
      'css', 'javascript', 'html', 'python', 'go',
    ],
  },
  {
    _id: 34152,
    name: 'Ian Silva',
    age: 19,
    address: '26 Avenue, CBABS, FLE',
    state: 'Arkansas',
    gender: 'male',
    courses: [
      'css', 'javascript', 'html', 'python', 'go',
    ],
  },
  {
    _id: 24172,
    name: 'John Silva',
    age: 19,
    address: '26 Avenue, CBABS, FLE',
    state: 'Arkansas',
    gender: 'male',
    courses: [
      'css', 'javascript', 'html', 'python', 'go',
    ],
  },
  {
    _id: 29152,
    name: 'Ryan Silva',
    age: 19,
    address: '26 Avenue, CBABS, FLE',
    state: 'Arkansas',
    gender: 'male',
    courses: [
      'css', 'javascript', 'html', 'python', 'go',
    ],
  },
];
const initialState = {
  list: initialStudents,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      debugger;
      return {
        ...state,
        list: [...state.list, { ...action.payload, _id: uniqueId(5769) }],
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
};

export const Selectors = {
  students: (state) => state.students.list,
};

export const useStudents = () => useSelector(Selectors.students);

export const useAddStudent = () => {
  const dispatch = useDispatch();
  return (newStudent) => dispatch(Creators.add(newStudent));
};
