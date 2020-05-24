import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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
import { storage } from '../config/firebaseConfig'
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
//import ImageUpload from './imageUpload';


class CreateList extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.state = {
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
            bust: '',
            date: new Date(),
            image: null,
            url: '',
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            users: []
        }
    }

    componentDidMount() {
        this.toggle();

        axios.get('http://localhost:4000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
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

    // handleImageChange = e => {
    //     if (e.target.files[0]) {
    //         const image = e.target.files[0];
    //         this.setState(() => ({image}));
    //     }
    // }


    // handleUpload = () => {

    //         const {image} =this.state;
    //         const uploadTask = storage.ref(`images/styles/${image.name}`).put(image);
    //         uploadTask.on('state_change',
    //         (snapshot) => {
    //             // progress function
    //             console.log(snapshot);

    //         },
    //         (error) => {
    //             // Error function
    //             console.log(error);

    //         },
    //         () => {
    //             // complete function
    //             storage.ref('images/styles').child(image.name).getDownloadURL.then(url => {
    //                 this.setState({url});
    //             })
    //         }
    //         )

    // }

    handleUploadSuccess = filename => {
        this.setState({
            image: filename,
            progress: 100
        })

        firebase.storage().ref('avatars').child(filename).getDownloadURL()
            .then(url => this.setState({
                url: url
            }))
    }


    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }

    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/styles/${image.name}`).put(image);
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
                storage.ref('images/styles').child(image.name).getDownloadURL.then(url => {
                    console.log(url);
                    this.setState({ url });
                })
            }
        )

    }


    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted: True`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Url: ${this.state.url}`);
        console.log(`Todo Image name: ${this.state.image}`);
        console.log(`Todo Created on: ${Date.now}`);

        const newTodo = {
            username: this.state.username,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            underbust: this.state.underbust,
            hip: this.state.hip,
            length: this.state.length,
            waist: this.state.waist,
            sleeve: this.state.sleeve,
            round_sleeve: this.state.round_sleeve,
            nip: this.state.nip,
            stk: this.state.stk,
            shoulder: this.state.shoulder,
            gown_length: this.state.gown_length,
            skirt_length: this.state.skirt_length,
            blouse_length: this.state.blouse_length,
            skirt_waist: this.state.skirt_waist,
            bust: this.state.bust,
            date: this.state.date,
            image: this.state.image,
            url: this.state.url,
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed,
            users: this.state.users
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        // Close modal
        this.toggle();

        this.setState({
            modal: false,
            username: '',
            users: [],
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
            bust: '',
            date: '',
            image: null,
            url: '',
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })

        // Refresh the page to show the new update
        window.location = '/';

        // Return to the previous page
        //this.props.history.push('/');

    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
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

                <Modal isOpen={ this.state.modal } toggle={ this.toggle }>
                    <ModalHeader toggle={ this.toggle }>Add Customer Data</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this.onSubmit }  >
                            <FormGroup>
                                <div className="form-group">
                                    <label>Username: </label>
                                    <select ref="userInput"
                                        required
                                        className="form-control"
                                        value={ this.state.username }
                                        onChange={ this.onChangeUsername }>
                                        {
                                            this.state.users.map(function (user) {
                                                return <option
                                                    key={ user }
                                                    value={ user }>{ user }
                                                </option>;
                                            })
                                        }
                                    </select>
                                </div>
                                <Label for='item'>*Name: </Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='item'
                                    placeholder='Add Customer Name'
                                    onChange={ this.onChange }
                                />
                                <Label for='phone'>*Phone: </Label>
                                <Input
                                    type='text'
                                    name='phone'
                                    id='phone'
                                    placeholder='Add Customer Phone Number'
                                    onChange={ this.onChange }
                                />
                                <Label for='email'>*E-mail: </Label>
                                <Input
                                    type='text'
                                    name='email'
                                    id='email'
                                    placeholder='Add Customer E-mail'
                                    onChange={ this.onChange }
                                />
                                <Label for='bust'>Bust: </Label>
                                <Input
                                    type='text'
                                    name='bust'
                                    id='bust'
                                    placeholder='Add Customer Bust'
                                    onChange={ this.onChange }
                                />
                                <Label for='underbust'>UnderBust: </Label>
                                <Input
                                    type='text'
                                    name='underbust'
                                    id='underbust'
                                    placeholder='Add Customer UnderBust'
                                    onChange={ this.onChange }
                                />
                                <Label for='hip'>Hip: </Label>
                                <Input
                                    type='text'
                                    name='hip'
                                    id='hip'
                                    placeholder='Add Customer Hip'
                                    onChange={ this.onChange }
                                />
                                <Label for='length'>Length: </Label>
                                <Input
                                    type='text'
                                    name='length'
                                    id='length'
                                    placeholder='Add Customer Length'
                                    onChange={ this.onChange }
                                />
                                <Label for='waist'>Waist: </Label>
                                <Input
                                    type='text'
                                    name='waist'
                                    id='waist'
                                    placeholder='Add Customer Waist'
                                    onChange={ this.onChange }
                                />
                                <Label for='nip'>Nip to Nip: </Label>
                                <Input
                                    type='text'
                                    name='nip'
                                    id='nip'
                                    placeholder='Add Customer Nip to Nip'
                                    onChange={ this.onChange }
                                />
                                <Label for='gown_length'>Gown Length: </Label>
                                <Input
                                    type='text'
                                    name='gown_length'
                                    id='gown_length'
                                    placeholder='Add Customer Gown Length'
                                    onChange={ this.onChange }
                                />
                                <Label for='skirt_length'>Skirt Length: </Label>
                                <Input
                                    type='text'
                                    name='skirt_length'
                                    id='skirt_length'
                                    placeholder='Add Customer Skirt Length'
                                    onChange={ this.onChange }
                                />
                                <Label for='blouse_length'>Blouse Length: </Label>
                                <Input
                                    type='text'
                                    name='blouse_length'
                                    id='blouse_length'
                                    placeholder='Add Customer Blouse Length'
                                    onChange={ this.onChange }
                                />
                                <Label for='skirt_waist'>Skirt Waist: </Label>
                                <Input
                                    type='text'
                                    name='skirt_waist'
                                    id='skirt_waist'
                                    placeholder='Add Customer Skirt Waist'
                                    onChange={ this.onChange }
                                />
                                <Label for='stk'>Shoulder to Knee: </Label>
                                <Input
                                    type='text'
                                    name='stk'
                                    id='stk'
                                    placeholder='Add Customer Shoulder to Knee'
                                    onChange={ this.onChange }
                                />
                                <Label for='shoulder'>Shoulder: </Label>
                                <Input
                                    type='text'
                                    name='shoulder'
                                    id='shoulder'
                                    placeholder='Add Customer Shoulder'
                                    onChange={ this.onChange }
                                />
                                <Label for='sleeve'>Sleeve: </Label>
                                <Input
                                    type='text'
                                    name='sleeve'
                                    id='sleeve'
                                    placeholder='Add Customer Sleeve'
                                    onChange={ this.onChange }
                                />
                                <Label for='round_sleeve'>Round Sleeve: </Label>
                                <Input
                                    type='text'
                                    name='round_sleeve'
                                    id='round_sleeve'
                                    placeholder='Add Customer Round Sleeve'
                                    onChange={ this.onChange }
                                />

                                <div className="form-group">
                                    <Label for='image'>Style:  </Label>
                                </div>
                                { this.state.image && <img src={ this.state.url } height="100" width="100" /> }
                                <br />
                                <FileUploader
                                    accept="image/*"
                                    name="image"
                                    storageRef={ firebase.storage().ref('avatars') }
                                    onUploadSuccess={ this.handleUploadSuccess }
                                />

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
                                    <label>Style Description: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={ this.state.todo_description }
                                        onChange={ this.onChangeTodoDescription }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Person-in-Charge: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={ this.state.todo_responsible }
                                        onChange={ this.onChangeTodoResponsible }
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="priorityOptions"
                                            id="priorityLow"
                                            value="Low"
                                            checked={ this.state.todo_priority === 'Low' }
                                            onChange={ this.onChangeTodoPriority }
                                        />
                                        <label className="form-check-label">Low</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="priorityOptions"
                                            id="priorityMedium"
                                            value="Medium"
                                            checked={ this.state.todo_priority === 'Medium' }
                                            onChange={ this.onChangeTodoPriority }
                                        />

                                        <label className="form-check-label">Medium</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="priorityOptions"
                                            id="priorityHigh"
                                            value="High"
                                            checked={ this.state.todo_priority === 'High' }
                                            onChange={ this.onChangeTodoPriority }
                                        />
                                        <label className="form-check-label">High</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Create Measurement" className="btn btn-success" />

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
        auth: state.firebase.auth
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         createProject: (project) => dispatch(createProject(project))
//         //createUsername: (username) => dispatch(createUsername(username))
//     }
// }
export default connect(mapStateToProps)(CreateList);