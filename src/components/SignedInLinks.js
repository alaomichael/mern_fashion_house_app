// import React from 'react'
// import { Link } from 'react-router-dom';


// const SignedInLinks = () => {
//   return (
//     <>
//           <ul className="right navbar-nav mr-auto">
//               <li className="navbar-item">
//                   <Link to="/" className="nav-link">Log Out</Link>
//               </li>
//               <li className="navbar-item">
//                   <Link to="/" className="nav-link">F&LName</Link>
//               </li>
//       </ul>
//     </>
//   )
// }

// export default SignedInLinks

import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import 'materialize-css'

//import {Button} from 'react-materialize'

const SignedInLinks = (props) => {
  return (

    <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li> <Link to="/" className="navbar-brand brand-logo">Measurement App</Link></li>
        <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
        </li>
        <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Customer Data</Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="nav-link">Customers Data</Link>
        </li>
        <li><Link className="nav-link" onClick={ props.signOut }>
          Log Out
        </Link></li>
      <li><NavLink to="/" className="btn btn-floating pink lighten-1">{ props.profile.initials }</NavLink></li>
    </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);