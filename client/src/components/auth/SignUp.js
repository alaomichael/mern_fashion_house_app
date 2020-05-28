import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
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

        this.props.signUp(this.state);
        // Close modal
        this.toggle();
    }
    render() {
        const { auth, authError } = this.props;
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
                        Sign Up
</Button>
                </h4>

            <Modal isOpen={ this.state.modal } toggle={ this.toggle }>
                <ModalHeader toggle={ this.toggle } className="grey-text text-darken-3">Sign Up</ModalHeader>
                <ModalBody>
<Form onSubmit={ this.handleSubmit } className="container">
<FormGroup>
                                <h5 className="grey-text text-darken-3"> Sign Up</h5>
                    <div className="input-field">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input type="text" id="firstName" onChange={ this.handleChange } required />
                    </div>
                    <div className="input-field">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input type="text" id="lastName" onChange={ this.handleChange }required />
                    </div>

                    <div className="input-field">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" onChange={ this.handleChange } required />
                    </div>
                     <div className="input-field">
                        <Label htmlFor="phone">Phone No.</Label>
                        <Input type="phone" id="phone" onChange={ this.handleChange } required />
                    </div>
                    <div className="input-field">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" onChange={ this.handleChange } />
                    </div>
                    <div className="input-field">
                        <Button className=" btn btn-success lighten-1 z-depth-0">Sign Up</Button>
                        <div className="red-text center">
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
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
