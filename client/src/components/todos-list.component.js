import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment'
import Search from './Search'
import Pagination from './Pagination'

const Todo = (props) => (
    
      <>
         <tr>
           <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.todo_responsible }</td>
            <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.name }</td>
            <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.phone }</td>
            <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.email }</td>
            <td className={ props.todo.todo_completed ? 'completed' : '' }>
                <img src={ props.todo.url || props.todo.image || 'https://via.placeholder.com/150' } alt="Uploaded Style" height="150" width="150" />
            </td>            
            <td>{ moment(props.todo.date).fromNow() }</td>
            <Link to={ "/show/" + props.todo._id }>
                <Button
                    className="btn btn-success"
                >Show</Button>
            </Link>
            { ` | ` }
            <Link to={ "/edit/" + props.todo._id }>
                <Button className='btn btn-primary'
                >Edit</Button>
            </Link>
            { ` | ` }
            <Button
                className='btn btn-danger'
                onClick={ props.onDeleteClick.bind(this, props.todo._id) } >Delete</Button>

        </tr>
    </> 
)


class TodosList extends Component {

    constructor(props) {
        super(props);
        const {auth} = this.props;
        const owneremail = auth.email;
        
        this.state = {
            todos: [],
            username: '',
            users: [],
            loading: false,
            currentPage: 1,
            todosPerPage: 5,
            owneremail:owneremail
        };
        console.log(this.state);
    }
    
    componentDidMount() {
        axios.get('https://clothmeasurement.herokuapp.com/todos/')
            .then(response => {
                this.setState({
                     todos: response.data,
                    username: response.data.username,
                    users: response.data.users
                });
            })
            .catch(function (error) {
                console.log(error);
            })


        // Get Username
        axios.get('https://clothmeasurement.herokuapp.com/users/')
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


    }

    todoList() {
        // Pagination props
         const { currentPage, todosPerPage, loading,todos } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        
        // Delete Button Link
        let onDeleteClick;
        onDeleteClick = _id => {
            axios.delete('https://clothmeasurement.herokuapp.com/todos/delete/' + _id)
                .then(res => console.log(res.data));
            this.setState({
                exercises: this.state.todos.filter(el => el._id !== _id)
            })

            // Refresh the page to show the new list of todos after deleting 
            window.location = '/';
        };

        return this.state.todos.map(function (currentTodo, i, _id) {

            return <Todo todo={ currentTodo }
                key={ i }
                id={ _id }
                onDeleteClick={ onDeleteClick }
            />;

        })
    }

    render() {

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div>
                <h3>Measurement List</h3>
                <table className="table table-striped"
                    style={ { marginTop: 20 } } >
                    <thead>
                        <th>Person-in-Charge</th>
                        <th>Customer's Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Image Link</th>
                        <th>Due for Collection</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        { this.todoList() }
       <Pagination todosPerPage={ todosPerPage } totalTodos={ this.state.todos.length } paginate={ paginate } />
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        owneremail: state.firebase.auth.email
    }
}

export default
    connect(mapStateToProps)
        (TodosList)
