import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Form from '../components/form';
import List from '../components/list';

const Navigation = () => (
  <div>
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Form
      </Link>
      <Link color="inherit" href="/list">
        List
      </Link>
    </Breadcrumbs>
    <Router>
      {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
      <Route path="/" exact>
        <Form />
      </Route>
      <Route path="/list" exact>
        <List />
      </Route>
    </Router>
  </div>
);

export default Navigation;
