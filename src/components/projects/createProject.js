import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
//import { createUsername} from '../../store/actions/usernameActions'
import { Redirect } from 'react-router-dom';

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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { storage } from '../../config/firebaseConfig'
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
//import FormModal from './formModal'


class CreateProject extends Component {

     constructor(props) {
        super(props);
     this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        
//this.handleChange = this.handleChange.bind(this);
       this.handleUpload = this.handleUpload.bind(this);

       this.state = {
title: '',
content: '',
modal: false,
username: '',
name: '',
phone: '',
underbust: '',
hip: '',
length: '',
waist: '',
sleeve: '',
round_sleeve: '',
nip: '',
stk: '',
shoulder: '',
gown_length: '',
skirt_length: '',
blouse_length: '',
skirt_waist: '',
email: '',
bust: '' , 
date: new Date(),
image:null,
url: '',
todo_description: '',
todo_responsible: '',
todo_priority: '',
todo_completed: false,
users: []
}
}

  componentDidMount() {
        // Open modal
this.toggle();
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }


    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

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

    
    handleUploadSuccess = filename => {
        this.setState({
            image: filename,
            progress: 100
        })

        firebase.storage().ref('pictures').child(filename).getDownloadURL()
            .then(url => this.setState({
                url: url
            }))
    }


// handleChange = e => {
// if (e.target.files[0]) {
// const image = e.target.files[0];
// this.setState(() => ({image}));
// }
// }

handleUpload = () => {
const {image} =this.state;
const uploadTask = storage.ref(`uploadedimages/styles/${image.name}`).put(image);
uploadTask.on('state_change',
(snapshot) => {
// progress function
console.log(snapshot);

},
(error) => {
// Error function
console.log(error);

},
() => {
// complete function
storage.ref('uploadedimages/styles').child(image.name).getDownloadURL.then(url => {
console.log(url);
this.setState({url});
})
}
)
}

handleSubmit = (e) => {
e.preventDefault();
// console.log(this.state);
this.props.createProject(this.state)
//this.props.createUsername(this.state)

// Close modal
this.toggle();

       
this.setState({
title: '',
content: '',
modal: false,
username:'',
users:[],
name: '',
phone: '',
underbust: '',
hip: '',
length: '',
waist: '',
sleeve: '',
round_sleeve: '',
nip: '',
stk: '',
shoulder: '',
gown_length: '',
skirt_length: '',
blouse_length: '',
skirt_waist: '',
email: '',
bust: ''  ,
date:'',
image:null,
url:'',
todo_description: '',
todo_responsible: '',
todo_priority: '',
todo_completed: false
})

// Redirect user to the homepage after creating the project
        this.props.history.push('/');
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            
<div className="container">
<div style={ { marginTop: 10 } }>
<h4 align="center" >
<Button
color='dark'
style={ { marginBottom: '2rem' } }
onClick={ this.toggle }
>
Add Customer Data
</Button>
</h4>

<Modal isOpen={ this.state.modal } toggle={ this.toggle } >
<ModalHeader toggle={ this.toggle }>Add Customer Data</ModalHeader>
<ModalBody style={ {
background: '#95e8f3'
} }>

<Form onSubmit={ this.handleSubmit } className="container">
<FormGroup>
<div className="input-field">
<Label htmlFor="title">Title: </Label>
<Input type="text" id="title" onChange={ this.handleChange } />
</div>

<div className="input-field">
<Label for='item'>*Name: </Label>
<Input
type='text'
name='name'
id='item'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='phone'>*Phone: </Label>
<Input
type='text'
name='phone'
id='phone'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='email'>*E-mail: </Label>
<Input
type='text'
name='email'
id='email'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='bust'>Bust: </Label>
<Input
type='text'
name='bust'
id='bust'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='underbust'>UnderBust: </Label>
<Input
type='text'
name='underbust'
id='underbust'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='hip'>Hip: </Label>
<Input
type='text'
name='hip'
id='hip'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='length'>Length: </Label>
<Input
type='text'
name='length'
id='length'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='waist'>Waist: </Label>
<Input
type='text'
name='waist'
id='waist'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='nip'>Nip to Nip: </Label>
<Input
type='text'
name='nip'
id='nip'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='gown_length'>Gown Length: </Label>
<Input
type='text'
name='gown_length'
id='gown_length'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='skirt_length'>Skirt Length: </Label>
<Input
type='text'
name='skirt_length'
id='skirt_length'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='blouse_length'>Blouse Length: </Label>
<Input
type='text'
name='blouse_length'
id='blouse_length'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='skirt_waist'>Skirt Waist: </Label>
<Input
type='text'
name='skirt_waist'
id='skirt_waist'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='stk'>Shoulder to Knee: </Label>
<Input
type='text'
name='stk'
id='stk'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='shoulder'>Shoulder: </Label>
<Input
type='text'
name='shoulder'
id='shoulder'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='sleeve'>Sleeve: </Label>
<Input
type='text'
name='sleeve'
id='sleeve'

onChange={ this.onChange }
/>
</div>
<div className="input-field">
<Label for='round_sleeve'>Round Sleeve: </Label>
<Input
type='text'
name='round_sleeve'
id='round_sleeve'

onChange={ this.onChange }
/>
</div>

<div className="form-group">
<Label for='image'>Style:  </Label>
</div>
{ this.state.image && <img src={ this.state.url }  height="100" width="100" /> }
<br />
<FileUploader
accept="image/*"
name="image"
storageRef={ firebase.storage().ref('pictures') }
onUploadSuccess={ this.handleUploadSuccess }
/>
<br />
<br />
<div className="form-group">
<label>Collection Date: </label>
<div>
<DatePicker
selected={ this.state.date }
onChange={ this.onChangeDate }
/>
</div>
</div>

<div className="form-group">
<label>
<input className="with-gap"  
type="radio" 
name="priorityOptions"
id="priorityLow"
value="Low"
checked={ this.state.todo_priority === 'Low' }
onChange={ this.onChangeTodoPriority }  />
<span>Low</span>
</label>
{ `  ` }
<label>
<input className="with-gap"
type="radio"
name="priorityOptions"
id="priorityMedium"
value="Medium"
checked={ this.state.todo_priority === 'Medium' }
onChange={ this.onChangeTodoPriority }
/>                            
<span>Medium</span>
</label> 
{ `  ` }                           
<label>
<input className="with-gap"
type="radio"
name="priorityOptions"
id="priorityHigh"
value="High"
checked={ this.state.todo_priority === 'High' }
onChange={ this.onChangeTodoPriority }
/>                            
<span>High</span>
</label>                        
</div>   
<div className="input-field">
<label>Description: </label>
<input type="text"
className="form-control"
value={ this.state.todo_description }
onChange={ this.onChangeTodoDescription }
/>
</div>

<div className="input-field">
<label>Person-in-Charge: </label>
<input type="text" 
className="form-control"
value={ this.state.todo_responsible }
onChange={ this.onChangeTodoResponsible }
/>
</div>
<br />
<br />
<div className="form-group"> 
<input type="submit" value="Create New Measurement" className="btn btn-success lighten-1 z-depth-0 modal-close waves-effect waves-green btn-flat" /> 
</div>                
</FormGroup>
</Form>  
</ModalBody>
</Modal>       
</div> 
</div>
)
}
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
       // username: state.firebase.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
        //createUsername: (username) => dispatch(createUsername(username))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);