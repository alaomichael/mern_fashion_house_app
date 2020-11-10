import React from 'react';
import SignedOutLinks from './SignedOutLinks';
import { Card } from 'reactstrap';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


const Home = (props) => {
    const { auth} = props;
    const links = auth.uid ? <Redirect to='/list' /> : <SignedOutLinks />

  return (
    <>
    <Card>
         <p>This application is for keeping the records of your customers measurement in an easily accessible platform.</p>
        <p><b>Sign Up Now or Sign In to Enjoy this service.</b></p>
          
            <p><strong>You can contact us on +234-703-368-0599 or contactleomax@gmail.com</strong></p>
        </Card>
        
        {links}
        
        
    </>
  );
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }

}

export default connect(mapStateToProps)(Home);
 
