import React from 'react';
//import SignedOutLinks from './SignedOutLinks';
import { Card } from 'reactstrap';
import { connect } from 'react-redux'
import { Link , Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
//import { FaGithub,FaTwitter } from 'react-icons/fa';
import {Button} from 'react-bootstrap'

import '../index.css';
import '../App.css';

import image from "../logo192.jpg";
import image1 from "../images/download.jpeg";
import image2 from "../images/images8.jpeg";
import image3 from "../images/download1.jpeg";
import image4 from "../images/images10.jpeg";
import image5 from "../images/images4.jpeg";

const BootstrapHome = (props) => {
   // const { auth} = props;
   // const links = auth.uid ? <Redirect to='/' /> : <SignedOutLinks />
   
  //  const signup = <Redirect to='/signup' />;
  //   const signin = <Redirect to='/signin' />;

  return (
    <>
    <div className='container' >  
   <div className="jumbotron">
  <h1 className="display-5">Welcome to Cloth Measurement Record Application</h1>
  <p className="lead"> 
  This application is for keeping the records of your customers measurement in an easily accessible platform.
  </p>
      
  <hr className="my-4" />   
  <p className='row align-items-center justify-content-center'><b>Sign Up Now or Sign In to Experience and Enjoy this service.</b></p>
   <div className='row align-items-center  justify-content-center'>
<Link to={ "/signup" }>
<Button
className="btn btn-success btn-lg m-2"
> Get Started</Button>
</Link>
<Link to={ "/signin" }>
<Button
className="btn btn-success btn-lg m-2"
> Log Me In</Button>
</Link>
  </div>
  <div className='row align-items-center justify-content-center'>
<p >You can contact us on  {`   `}  
   <a href="tel:+2347033680599">Call Now</a>   or  {`   `}     
   <a href="mailto:contactleomax@gmail.com">Send Us a Mail</a>.</p>
   </div>
</div>
<div className='row align-items-center justify-content-center'>
<h3>You can get Started in 3 Simple Steps.</h3>
</div>
<div className='row align-items-center justify-content-center'>
<div className="col-sm-4">
<Card className='text-white bg-danger '>
<article>
<img className='card-img-top bd-placeholder-img' width='100%' height='100' aria-label='Placeholder: Image cap' src={image} alt="imag1"/> 
  <div className='card-header'>Sign Up</div>
  <div className='card-body'>
  <h5 className='card-title'>Just input you details</h5>
  <p className='card-text'> You are one step closer to measure and store your customer data. </p>
  </div>
  <footer></footer>
</article>
</Card>
</div>
<div className="col-sm-4">
<Card className='text-white bg-warning '>
<article>
<img className='card-img-top bd-placeholder-img' width='100%' height='100' aria-label='Placeholder: Image cap' src={image1} alt="imag2"/> 
  <div className='card-header'>Record</div>
  <div className='card-body'>
  <h5 className='card-title'>You can then store.</h5>
  <p className='card-text'>This take you to the begining of the great experience this applictaion offers. </p>
  </div>
  <footer></footer>
</article>
</Card>
</div>
<div className="col-sm-4">
<Card className='text-white bg-success '>
<article>
<img className='card-img-top bd-placeholder-img img-rounded img-responsive' width='100%' height='100' aria-label='Placeholder: Image cap' src={image2} alt="imag3"/> 
  <div className='card-header'>Access</div>
  <div className='card-body'>
  <h5 className='card-title'>You can get your records</h5>
  <p className='card-text'> At this stage you can view,edit or delete any customer data with ease.  </p>
  </div>
  <footer></footer>
</article>
</Card>
</div>
</div>
<hr className="my-3"/>
<div className='row align-items-center justify-content-center'>
<div className="col-sm-4">
<img className='img-responsive border-success img-thumbnail rounded' width='100%'  height='150' aria-label='Placeholder: Image cap' src={image3} alt="imag2"/> 
</div>
<div className="col-sm-4">
<img className='img-responsive border-primary img-thumbnail rounded' width='100%' height='150' aria-label='Placeholder: Image cap' src={image4} alt="imag3"/> 
</div>
<div className="col-sm-4">
<img className='img-responsive border-warning img-thumbnail rounded' width='100%' height='150' aria-label='Placeholder: Image cap' src={image5} alt="imag"/> 
</div>
</div>
   </div>
    </>

  );
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth
    }

}

export default connect(mapStateToProps)(BootstrapHome);
 