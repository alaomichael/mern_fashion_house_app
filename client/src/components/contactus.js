import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css';
import axios from "axios";
// import { storage } from '../config/firebaseConfig'
// import FileUploader from 'react-firebase-file-uploader';
// import firebase from 'firebase';
//import { FaGithub,FaTwitter } from 'react-icons/fa';
//import {Button} from 'react-bootstrap'
class ContactUs extends Component {
constructor(props) {
super(props);

this.state = {
email: '',
phone: '',
name: '',
message: '',
file:'',
image:'',
url:'',
sent:false
}
}       
handleChange = (e) => {
this.setState({
[e.target.id]: e.target.value
})
console.log(e);
}
handleSubmit = (e) => {
e.preventDefault()
console.log(this.state);
let data = {
name:this.state.name,
email:this.state.email,
phone: this.state.phone,
message: this.state.message,
file: this.state.file,
url:this.state.url
}
//|| 'https://clothmeasurement.herokuapp.com/contactus/' 
axios.post('https://clothmeasurement.herokuapp.com/todos/contactus' , data)
.then(response => {
this.setState({sent:true,},
this.resetForm())
})
.catch(err => console.error(err + `message not sent.`));

}

// For reseting initial data
resetForm=()=>{
this.setState({
email: '',
phone: '',
name: '',
message: '',
file:'',
image:'',
url:''
})
setTimeout(()=>{
this.setState({
sent:false
})
},3000)
}
render() {
return (
<>
<div className='mycontainer'>
<form action=''  onSubmit={ this.handleSubmit } className="white">
<h3 className="grey-text text-darken-3">Contact Us</h3>
<div className="form-group">
<label htmlFor="name">Name: </label>
<input type="text" id="name" onChange={ this.handleChange } required />
</div>
<div className="form-group">
<label htmlFor="email">Email: </label>
<input type="email" id="email" onChange={ this.handleChange } required/>
</div>
<div className="form-group">
<label htmlFor="phone">Phone No.: </label>
<input type="phone" id="phone" onChange={ this.handleChange } required/>
</div>
<div className="form-group">
<label htmlFor="message">Message: </label>
<textarea name="message" id="message" cols="30" rows="10" resize='vertical' onChange={ this.handleChange } required spellCheck='true' />
</div>
<button type='submit' className="btn pink lighten-1 z-depth-0">Send Message</button>

</form>
</div>
<div id="status" className={this.state.sent? 'success' : 'nomsg'}>Message Sent.</div>
<div id="status" className={this.state.sent? 'nomsg' : 'error'}>Message Not Sent.</div>
</>
)
}
}

export default ContactUs
