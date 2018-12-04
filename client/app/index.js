import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import UserRole from './components/UserRole/UserRole';
import Prescription from './components/Prescription/Prescription';

import './styles/styles.scss';


render((
  <Router>
    <App>
      <Switch>
        <Route path="/userrole" component={UserRole}/>
        <Route path="/home" component={Home}/>
        <Route path="/prescription" component={Prescription}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
