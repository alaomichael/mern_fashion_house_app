import logo from "../logo.svg";
import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'


const NavBar = (props) => {
    const { auth, profile } = props;
   
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
