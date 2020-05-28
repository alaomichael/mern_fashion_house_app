import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom';
import {
Button,
Modal,
ModalHeader,
ModalBody,
Form,
FormGroup,
Input
} from 'reactstrap';
class SignIn extends Component {

state = {
email: '',
password: ''
}

componentDidMount() {
this.toggle();
}


toggle = () => {
this.setState({
modal: !this.state.modal
});
};
handleChange = (e) => {
this.setState({
[e.target.id]: e.target.value
})
}

handleSubmit = (e) => {
e.preventDefault();
this.props.signIn(this.state);
// Close modal
this.toggle();
}
render() {
const { authError, auth } = this.props;
// Redirect to the signin page if user has not login
if (auth.uid) return <Redirect to='/' />
return (
<div style={ { marginTop: 10 } }>
<h4 align="center" >
<Button
color='dark'
style={ { marginBottom: '2rem' } }
onClick={ this.toggle }
>
Sign In
</Button>
</h4>

<Modal isOpen={ this.state.modal } toggle={ this.toggle }>
<ModalHeader toggle={ this.toggle } className="grey-text text-darken-3">Sign In</ModalHeader>
<ModalBody>         
<Form onSubmit={ this.handleSubmit } className="container">
<FormGroup>
<h5 className="grey-text text-darken-3"> Sign In</h5>
<div className="input-field">
<label htmlFor="email">Email</label>
<Input type="email" id="email" onChange={ this.handleChange } />
</div>
<div className="input-field">
<label htmlFor="password">Password</label>
<Input type="password" id="password" onChange={ this.handleChange } />
</div>
<div className="input-field">
<Button className=" btn btn-success lighten-1 z-depth-0">Login</Button>
<div className="red-text center" >
{ authError ? <p>{ authError }</p> : null }
</div>
</div>
</FormGroup>
</Form>
</ModalBody>
</Modal>
</div>

)
}
}

const mapStateToProps = (state) => {
return {
authError: state.auth.authError,
auth: state.firebase.auth
}
}

const mapDispatchToProps = (dispatch) => {
return {
signIn: (creds) => dispatch(signIn(creds))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
