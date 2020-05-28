// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import logo from "../logo.svg";
// import SignedInLinks from './SignedInLinks'
// import SignedOutLinks from './SignedOutLinks'

// export default class Navbar extends Component {

//     render() {
//         return (
// <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
//                 <a className="navbar-brand" href="https://alaomichael.github.io" target="_blank" rel="noopener noreferrer">
//                     <img src={ logo } width="30" height="30" alt="Alao Michael" />
//                 </a>
// <Link to="/" className="navbar-brand">Customer Measurement Record App</Link>
// <div className="collpase navbar-collapse">
// <ul className="navbar-nav mr-auto">
// <li className="navbar-item">
// <Link to="/user" className="nav-link">Create User</Link>
// </li>
// <li className="navbar-item">
// <Link to="/create" className="nav-link">Create Customer Data</Link>
// </li>
// <li className="navbar-item">
// <Link to="/" className="nav-link">Customers Data</Link>
// </li>
// <SignedInLinks />
// <SignedOutLinks />
// </ul>
// </div>
// </nav>
//         );
//     }
// }



import logo from "../logo.svg";
import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'


const NavBar = (props) => {
    const { auth, profile } = props;
    //console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={ profile } /> : <SignedOutLinks />

    return (
      

<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
<a className="navbar-brand" href="https://alaomichael.github.io" target="_blank" rel="noopener noreferrer">
<img src={ logo } width="30" height="30" alt="Alao Michael" />
</a>
{ links }
</nav>
     

    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }

}

export default connect(mapStateToProps)(NavBar);