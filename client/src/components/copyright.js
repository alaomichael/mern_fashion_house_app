//import logo from "../logo.svg";
import logo from "../logo192.jpg";
import React from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteRight,FaGithub,FaTwitter } from 'react-icons/fa';

const Copyright = (props) => {
  
    return (
        <> 
        <div className='row align-items-center justify-content-center'> 
<footer className="bd-footer text-muted align-self-auto">
  <div className="container-fluid p-3 p-md-5" >
  <p className='row align-items-center justify-content-center'>Connect with Us Now on:</p>
  <ul className="bd-footer-links">
     <li className='list-unstyled'><a href="https://github.com/alaomichael"><FaGithub />{` `}Github </a></li>
      <li className='list-unstyled'><a href="https://twitter.com/contactleomax"><FaTwitter />{` `}Twitter</a></li>
    </ul>  
    </div>  
       <div className='row align-items-center justify-content-center'>
        
<a href="tel:+2347033680599">Click to Call Us Now</a>
        </div>
        <div >   
Copyright since 2020 {` `}  
<a className="navbar-brand"  href="https://alaomichael.github.io" target="_blank" rel="noopener noreferrer">
<img src={ logo } width="30" height="30" alt="Alao Michael" />{` `} 
Leomax International</a>
<span className='row align-items-center justify-content-center'> <a href="http://alaomichael.github.io" target="_blank" rel="noopener noreferrer"> Designed and built by Michael Alao.</a> </span>
     </div>  
</footer>
</div>
<br/>
<br/>
</>
 )
}

export default Copyright;
