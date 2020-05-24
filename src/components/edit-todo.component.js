import React, { Component } from 'react';
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
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
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
            image: null,
            url: '',
            date: new Date(),
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            users: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    name: response.data.name,
                    phone: response.data.phone,
                    email: response.data.email,
                    underbust: response.data.underbust,
                    hip: response.data.hip,
                    length: response.data.length,
                    waist: response.data.waist,
                    sleeve: response.data.sleeve,
                    round_sleeve: response.data.round_sleeve,
                    nip: response.data.nip,
                    stk: response.data.stk,
                    shoulder: response.data.shoulder,
                    gown_length: response.data.gown_length,
                    skirt_length: response.data.skirt_length,
                    blouse_length: response.data.blouse_length,
                    skirt_waist: response.data.skirt_waist,
                    bust: response.data.bust,
                    image: response.data.image,
                    url: response.data.url,
                    date: new Date(response.data.date), todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        // Get Username
        axios.get('http://localhost:4000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

        // Open Modal
        this.openModal();
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
    openModal = () => {

        this.toggle();

    }

    //To show uploaded style
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

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
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

    handleImageChange = e => {
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
                    this.setState({ url });
                })
            }
        )

    }



    onSubmit(e) {
        e.preventDefault();

        const obj = {
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
            image: this.state.image,
            url: this.state.url,
            date: this.state.date,
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        // Open the Homepage   
        window.location = '/';

    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (

            <div style={ { marginTop: 10 } }>
                <h4 align="center"><Button
                    color='dark'
                    style={ { marginBottom: '2rem' } }
                    onClick={ this.toggle }
                >
                    Update Customer Data
</Button></h4>

                <Modal isOpen={ this.state.modal } toggle={ this.toggle }>
                    <ModalHeader toggle={ this.toggle }>Edit Customer Data</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this.onSubmit }>
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
                                <Label for='item'>Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='item'
                                    value={ this.state.name }
                                    onChange={ this.onChange }
                                />

                                <Label for='phone'>Phone</Label>
                                <Input
                                    type='text'
                                    name='phone'
                                    id='phone'
                                    value={ this.state.phone }
                                    onChange={ this.onChange }
                                />
                                <Label for='email'>E-mail</Label>
                                <Input
                                    type='text'
                                    name='email'
                                    id='email'
                                    value={ this.state.email }
                                    onChange={ this.onChange }
                                />
                                <Label for='bust'>Bust</Label>
                                <Input
                                    type='text'
                                    name='bust'
                                    id='bust'
                                    value={ this.state.bust }
                                    onChange={ this.onChange }
                                />
                                <Label for='underbust'>UnderBust</Label>
                                <Input
                                    type='text'
                                    name='underbust'
                                    id='underbust'
                                    value={ this.state.underbust }
                                    onChange={ this.onChange }
                                />
                                <Label for='hip'>Hip</Label>
                                <Input
                                    type='text'
                                    name='hip'
                                    id='hip'
                                    value={ this.state.hip }
                                    onChange={ this.onChange }
                                />
                                <Label for='length'>Length</Label>
                                <Input
                                    type='text'
                                    name='length'
                                    id='length'
                                    value={ this.state.length }
                                    onChange={ this.onChange }
                                />
                                <Label for='waist'>Waist</Label>
                                <Input
                                    type='text'
                                    name='waist'
                                    id='waist'
                                    value={ this.state.waist }
                                    onChange={ this.onChange }
                                />
                                <Label for='nip'>Nip to Nip</Label>
                                <Input
                                    type='text'
                                    name='nip'
                                    id='nip'
                                    value={ this.state.nip }
                                    onChange={ this.onChange }
                                />
                                <Label for='gown_length'>Gown Length</Label>
                                <Input
                                    type='text'
                                    name='gown_length'
                                    id='gown_length'
                                    value={ this.state.gown_length }
                                    onChange={ this.onChange }
                                />
                                <Label for='skirt_length'>Skirt Length</Label>
                                <Input
                                    type='text'
                                    name='skirt_length'
                                    id='skirt_length'
                                    value={ this.state.skirt_length }
                                    onChange={ this.onChange }
                                />
                                <Label for='blouse_length'>Blouse Length</Label>
                                <Input
                                    type='text'
                                    name='blouse_length'
                                    id='blouse_length'
                                    value={ this.state.blouse_length }
                                    onChange={ this.onChange }
                                />
                                <Label for='skirt_waist'>Skirt Waist</Label>
                                <Input
                                    type='text'
                                    name='skirt_waist'
                                    id='skirt_waist'
                                    value={ this.state.skirt_waist }
                                    onChange={ this.onChange }
                                />
                                <Label for='stk'>Shoulder to Knee</Label>
                                <Input
                                    type='text'
                                    name='stk'
                                    id='stk'
                                    value={ this.state.stk }
                                    onChange={ this.onChange }
                                />
                                <Label for='shoulder'>Shoulder</Label>
                                <Input
                                    type='text'
                                    name='shoulder'
                                    id='shoulder'
                                    value={ this.state.shoulder }
                                    onChange={ this.onChange }
                                />
                                <Label for='sleeve'>Sleeve</Label>
                                <Input
                                    type='text'
                                    name='sleeve'
                                    id='sleeve'
                                    value={ this.state.sleeve }
                                    onChange={ this.onChange }
                                />
                                <Label for='round_sleeve'>Round Sleeve</Label>
                                <Input
                                    type='text'
                                    name='round_sleeve'
                                    id='round_sleeve'
                                    value={ this.state.round_sleeve }
                                    onChange={ this.onChange }
                                />

                                <div className="form-group">
                                    <Label for='image'>Style:  </Label>
                                </div>
                                { this.state.image && <img src={ this.state.url } height="150" width="150" /> }
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
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        id="completedCheckbox"
                                        type="checkbox"
                                        name="completedCheckbox"
                                        onChange={ this.onChangeTodoCompleted }
                                        checked={ this.state.todo_completed }
                                        value={ this.state.todo_completed }
                                    />
                                    <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
                                </div>

                                <div className="form-group">
                                    <input type="submit" value="Update Data" className="btn btn-success" />
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
//         updateProject: (project) => dispatch(updateProject(project))
//         //createUsername: (username) => dispatch(createUsername(username))
//     }
// }
export default connect(mapStateToProps)(EditTodo);