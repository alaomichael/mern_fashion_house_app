import React from 'react'
import { Link } from 'react-router-dom';


const SignedOutLinks = () => {
    return (
        <>
            <ul className="right navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/signin" className="nav-link">Login</Link>
                </li>
            </ul>
        </>
    )
}

export default SignedOutLinks

