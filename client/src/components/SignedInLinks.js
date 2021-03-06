import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import 'materialize-css'
import {Badge} from 'reactstrap'

//import {Button} from 'react-materialize'

const SignedInLinks = (props) => {
  return (

    <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li> <Link to="/" className="navbar-brand brand-logo">Measurement App</Link></li>
        <li className="navbar-item">
          <Link to="/create" className="nav-link">Add Customer Data</Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="nav-link">Show Customers Data</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contactus" className="nav-link">Contact Us</Link>
        </li>
        <li><Link className="nav-link" onClick={ props.signOut }>
          Log Out
        </Link></li>
    </ul>
      <h4><Badge pill >
        <NavLink to="/" className="btn btn-floating pink lighten-1">{ props.profile.initials }</NavLink>
      </Badge></h4>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
