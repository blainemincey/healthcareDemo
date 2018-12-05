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

//import Counter from './components/Counter/Counter';
import UserRole from './components/UserRole/UserRole';
import Prescription from './components/Prescription/Prescription';
import Intro from './components/Intro/Intro';

import './styles/styles.scss';


render((
  <Router>
    <App>
      <Switch>
        <Route path="/" exact component={Intro}/>
        <Route path="/userrole" component={UserRole}/>
        <Route path="/intro" component={Intro}/>
        <Route path="/prescription" component={Prescription}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
