import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import logo from './logo.svg';
import logo from './EkgRythm.gif';

class Header extends Component {

  render() {

    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Healthcare Demo</h1>
        </header>
      </div>
    )
  }
}

export default Header;
