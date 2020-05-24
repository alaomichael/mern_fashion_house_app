import React, { Component } from 'react';
import axios from 'axios';
//import {Label} from 'reactstrap';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment'

class ShowTodo extends Component {
    constructor(props) {
        super(props);
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
            date: '',
            image: '',
            url: '',
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }
    componentDidMount() {


        // axios.get('http://localhost:4000/users/')
        //     .then(response => {
        //         if (response.data.length > 0) {
        //             this.setState({
        //                 users: response.data.map(user => user.username),
        //                 username: response.data[0].username
        //             })
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

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
                    date: response.data.date,
                    image: response.data.image,
                    url: response.data.url,
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onSubmit(e) {
        e.preventDefault();
        // Open the Homepage   
        window.location = '/';

    }
    render() {

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div>
                <h3 align="center">Show Customer Data</h3>
                <form onSubmit={ this.onSubmit }>
                    <h5>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td> Username: </td>
                                    <td> { this.state.username }</td>
                                </tr>
                                <tr>
                                    <td> Name: </td>
                                    <td> { this.state.name }</td>
                                </tr>
                                <tr>
                                    <td> Phone: </td>
                                    <td> { this.state.phone }</td>
                                </tr>
                                <tr>
                                    <td> Email: </td>
                                    <td> { this.state.email }</td>
                                </tr>
                                <tr>
                                    <td> Bust: </td>
                                    <td>
                                        { this.state.bust }</td>
                                </tr>
                                <tr>
                                    <td> UnderBust: </td>
                                    <td>
                                        { this.state.underbust }</td>
                                </tr>
                                <tr>
                                    <td> Hip: </td>
                                    <td>
                                        { this.state.hip }</td>
                                </tr>
                                <tr>
                                    <td> Length: </td>
                                    <td>
                                        { this.state.length }</td>
                                </tr>
                                <tr>
                                    <td> Waist: </td>
                                    <td>
                                        { this.state.waist }</td>
                                </tr>
                                <tr>
                                    <td> Nip to Nip: </td>
                                    <td>
                                        { this.state.nip }</td>
                                </tr>
                                <tr>
                                    <td> Gown Length: </td>
                                    <td>
                                        { this.state.gown_length }</td>
                                </tr>
                                <tr>
                                    <td> Skirt Length: </td>
                                    <td>
                                        { this.state.skirt_length }</td>
                                </tr>
                                <tr>
                                    <td> Blouse Length: </td>
                                    <td>
                                        { this.state.blouse_length }</td>
                                </tr>
                                <tr>
                                    <td> Skirt Waist: </td>
                                    <td>
                                        { this.state.skirt_waist }</td>
                                </tr>
                                <tr>
                                    <td> Shoulder to Knee: </td>
                                    <td>
                                        { this.state.stk }</td>
                                </tr>
                                <tr>
                                    <td> Shoulder: </td>
                                    <td>
                                        { this.state.shoulder }</td>
                                </tr>
                                <tr>
                                    <td>Sleeve: </td>
                                    <td>
                                        { this.state.sleeve }</td>
                                </tr>
                                <tr>
                                    <td> Round Sleeve: </td>
                                    <td>
                                        { this.state.round_sleeve }</td>
                                </tr>
                                <tr>
                                    <td> Style: </td>
                                    <td>  <div><a href={ this.state.url }>
                                        { this.state.image && <img src={ this.state.url } height="150" width="150" /> }</a>
                                    </div></td>
                                </tr>
                                <tr>
                                    <td> Due for Collection: </td>
                                    <td>
                                        { moment(this.state.date).toLocaleString() }</td>
                                </tr>
                                <tr>
                                    <td> Style Description: </td>
                                    <td> { this.state.todo_description }</td>
                                </tr>
                                <tr>
                                    <td> Person-in-Charge: </td>
                                    <td>
                                        { this.state.todo_responsible }</td>
                                </tr>
                                <tr>
                                    <td>Priority: </td>
                                    <td>
                                        <div className="form-group">
                                            <div className="form-check form-check-inline">
                                                { ` ` }
                                                { this.state.todo_priority === 'Low' }
                                                <input className="form-check-input"
                                                    type="radio"
                                                    name="priorityOptions"
                                                    id="priorityLow"
                                                    value="Low"
                                                    checked={ this.state.todo_priority === 'Low' }
                                                    readOnly="True"
                                                />
                                                <label className="form-check-label">Low</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="priorityOptions"
                                                    id="priorityMedium"
                                                    value="Medium"
                                                    checked={ this.state.todo_priority === 'Medium' }
                                                    readOnly="True"
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
                                                    readOnly="True"
                                                />
                                                <label className="form-check-label">High</label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="form-check" > Completed: </td>
                                    <td>
                                        { this.state.todo_completed }
                                        <input
                                            className="form-check-input"
                                            id="completedCheckbox"
                                            type="checkbox"
                                            name="completedCheckbox"
                                            readOnly="True"
                                            checked={ this.state.todo_completed }
                                            value={ this.state.todo_completed }
                                        /> </td>
                                </tr>
                            </tbody>

                        </table>
                        <br />
                        <div className="form-group">
                            <input type="submit"
                                value="Back"
                                className="btn btn-primary" />
                        </div>
                    </h5>
                </form >
            </div >
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
//     }
// }
export default connect(mapStateToProps)(ShowTodo);