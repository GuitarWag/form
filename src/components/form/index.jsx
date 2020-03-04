import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import {
  Card,
  CardContent,
  DialogTitle,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Input, RadioGroup,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Formik, Field, useFormikContext } from 'formik';
import {
  object, number, string, array,
} from 'yup';
import {
  map, head, isEmpty, values, toUpper, get,
} from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
  useAddCourse, useCourses, useSelectCourse, useSelectedCourses, useUnselectCourse,
} from '../../store/courses';
import { useAddStudent } from '../../store/students';

const states = require('./states');

const message = 'You need to choose between 5 and 6 courses';
const ageMessage = 'Age must be between 18 and 25 years';

const coursesSchema = array()
  .of(string())
  .ensure()
  .min(5, message)
  .max(6, message);

const schema = object().shape({
  name: string().required('Name is required').max(20, 'Max length is 20'),
  gender: string().required('Gender is required'),
  address: string().required('Address is required').max(20, 'Max length is 20'),
  age: number().required().min(18, ageMessage).max(25, ageMessage),
  state: string().required('State is required'),
});

const Tag = ({ tag }) => {
  const unselect = useUnselectCourse();
  const onClick = () => {
    unselect(tag);
  };
  // eslint-disable-next-line jsx-a11y/interactive-supports-focus
  return <span className="tags" role="button" onClick={onClick}>{tag}</span>;
};

const Tags = ({ tags }) => (
  <div className="tag">
    {map(tags, (tag) => <Tag key={tag} tag={tag} />)}
  </div>
);

const SelectState = () => {
  const { values: vl, setFieldValue } = useFormikContext();
  const onChange = (e) => {
    setFieldValue('state', e.target.value);
  };
  return (
    <Select value={vl.state} onChange={onChange} label="Select a state">
      {map(values(states), (s) => (
        <MenuItem key={s} value={s}>{s}</MenuItem>
      ))}
    </Select>
  );
};

const GenderRadio = () => {
  const { values: vl, setFieldValue } = useFormikContext();
  const onChange = (e) => {
    setFieldValue('gender', e.target.value);
  };
  return (
    <RadioGroup value={vl.gender} onChange={onChange} label="Gender">
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="female" control={<Radio />} label="Female" />
    </RadioGroup>
  );
};

const Form = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [coursesErr, setErrors] = useState(null);
  const [newCourse, setNewCourse] = useState('');
  const onChangeNewCourse = (e) => {
    setNewCourse(e.target.value);
  };
  const courses = useCourses();
  const selectedCourses = useSelectedCourses();
  const addCourse = useAddCourse();
  const addStudent = useAddStudent();
  const selectCourse = useSelectCourse();
  const initialValues = {
    name: '',
    age: 18,
    gender: 'male',
    address: '',
    state: head(values(states)),
  };
  const onSubmit = (vl) => {
    addStudent({
      ...vl,
      courses: selectedCourses,
    });
    history.push('/list');
  };
  const onChange = (e) => {
    selectCourse(String(e.target.value));
  };
  useEffect(() => {
    const validate = async () => {
      try {
        const err = await coursesSchema.validate(selectedCourses);
        setErrors(err);
      } catch (e) {
        setErrors(e);
      }
    };
    validate();
  }, [selectedCourses]);
  return (
    <Card className="form-container">
      <DialogTitle>
        <Typography variant="h4">Insert your data</Typography>
      </DialogTitle>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
          options={{
            enableReinitialize: true,
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <div className="col">
                <Typography>Full name</Typography>
                <Field type="text" name="name" placeholder="Type your name" />
                {errors.name
                && touched.name
                && <FormHelperText error>{errors.name}</FormHelperText>}
                <Typography>Age</Typography>
                <Field type="number" name="age" placeholder="Type your age (18 - 25)" />
                {errors.age
                && touched.age
                && <FormHelperText error>{errors.age}</FormHelperText>}
                <Typography>Address</Typography>
                <Field type="text" name="address" placeholder="Type your address" />
                {errors.address
                && touched.address
                && <FormHelperText error>{errors.address}</FormHelperText>}
                <GenderRadio />
                <Typography>State</Typography>
                <SelectState />
                <Typography>Courses</Typography>
                <div className="row">
                  <Select value={head(courses)} onChange={onChange} label="Select a course">
                    {map(courses, (c) => (
                      <MenuItem key={c} value={c}>{toUpper(c)}</MenuItem>
                    ))}
                  </Select>
                  <Button variant="contained" type="button" color="primary" onClick={() => setVisible(true)}>
                    Add Course
                  </Button>
                  <Dialog open={visible} onClose={() => setVisible(false)}>
                    <DialogContent>
                      <DialogContentText>
                        Type the name of the course you want to add
                      </DialogContentText>
                      <Input onChange={onChangeNewCourse} value={newCourse} />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setVisible(false)} id="new-course" color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          addCourse(newCourse);
                          setVisible(false);
                          setNewCourse('');
                        }}
                        color="primary"
                      >
                        Add
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                {!isEmpty(selectedCourses)
                    && (
                      <div className="container">
                        <Typography>Selected Courses</Typography>
                        <Tags tags={selectedCourses} />
                      </div>
                    )}
                {get(coursesErr, 'errors')
                && <FormHelperText error>{message}</FormHelperText>}
                <div className="container">
                  <Button disabled={isSubmitting || get(coursesErr, 'errors')} variant="contained" type="button" color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            </>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default withRouter(Form);
