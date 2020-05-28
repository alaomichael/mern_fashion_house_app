import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import { connect } from 'react-redux'


const NavBar = (props) => {
    const { auth, profile } = props;
    //console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={ profile } /> : <SignedOutLinks />

    return (
        <nav className="nav-wrapper grey darken-3" >
            <div className="container">
                <Link to="/" className="brand-logo">MeasurementApp</Link>
                    { links }
            </div>
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