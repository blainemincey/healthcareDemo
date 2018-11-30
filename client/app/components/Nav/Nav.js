import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

  render() {

    return (
      <div>
        <nav>
          <ul className="nav">
            <li><Link to='/home' style={{color:'black'}} >Home</Link></li>
            <li><Link to='/' style={{color:'black'}} >UserRole</Link></li>
            <li><Link to='/notification' style={{color:'black'}} >Notification</Link></li>

          </ul>
        </nav>
      </div>
    )
  }
}

export default Nav;
