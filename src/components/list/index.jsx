import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { map } from 'lodash';
import { useStudents } from '../../store/students';

const List = () => {
  const students = useStudents();
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Courses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(students, (s) => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.age}</TableCell>
                <TableCell>{s.address}</TableCell>
                <TableCell>{s.state}</TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>
                  <span className="tag">
                    {map(s.courses, (c) => (
                      <span className="tags">{c}</span>
                    ))}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default List;
