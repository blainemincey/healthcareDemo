import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Navigation extends Component {

  render() {

    return (
      <div>

          <ul className="nav">
            <li><Link to='/home' style={{color:'black'}} >Home</Link></li>
            <li><Link to='/userrole' style={{color:'black'}} >UserRole</Link></li>
            <li><Link to='/prescription' style={{color:'black'}} >Prescription</Link></li>

          </ul>

      </div>
    )
  }
}

export default Navigation;
