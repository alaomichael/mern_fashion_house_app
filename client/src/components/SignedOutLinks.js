import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

const SignedOutLinks = () => {
    return (
        <>
        <Card>
         <p>This application is for keeping the records of your customers measurement in an easily accessible platform.</p>
        <p><b>Sign Up Now or Sign In to Enjoy this service.</b></p>
            <ul className="right navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/signin" className="nav-link">Login</Link>
                </li>
            </ul>
            <p><strong>You can contact us on +234-703-368-0599 or contactleomax@gmail.com</strong></p>
        </Card>
       
           
        </>
    )
}

export default SignedOutLinks

