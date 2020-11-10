import React, { Component } from 'react';
import { Link , Redirect} from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import moment from 'moment'
import {Filter} from "./filter";
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
<Link to={ "/list/show/" + props.todo._id }>
<Button
className="btn btn-success"
>Show</Button>
</Link>
{ ` | ` }
<Link to={ "/list/edit/" + props.todo._id }>
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
const { auth } = this.props;
const owneremail = auth.email;

this.state = {
todos: [],
username: '',
users: [],
loading: false,
currentPage: 1,
todosPerPage: 5,
owneremail: owneremail,
search: '',
word: '',
phone:0,
filtered:[],
initialTodos:[]
};  
} 

//     getData = () => {
//     let data = localStorage.getItem('myData');
//     data = JSON.parse(data);
//     console.log(data.owneremail);
// }

//     handleSearch = (e) => {
// e.preventDefault();
// console.log(e);
// this.setState({ [e.target.name]: e.target.value });
//     };

componentDidMount() {
const firebaseuser = this.props.auth.email;
//const firebaseuser = "youremail@gmail.com";
axios.get('http://localhost:5000/todos/list/?owneremail=' + firebaseuser)
.then(response => {
console.log(response.data);
this.setState({
todos: response.data,
username: response.data.username,
users: response.data.users,
initialTodos:response.data
});
})
.catch(function (error) {
console.log(error);
})

// Get Username
axios.get('http://localhost:5000/users/' || 'https://clothmeasurement.herokuapp.com/users/')
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

// Get localstorage
//  this.getData();
}
todoList() {
const { currentPage, todosPerPage, loading, todos,initialTodos } = this.state;
const indexOfLastTodo = currentPage * todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
const currentTodos = initialTodos.length > todos.length ? (todos.slice(indexOfFirstTodo, indexOfLastTodo)) : (initialTodos.slice(indexOfFirstTodo, indexOfLastTodo) );
// Delete Button Link
let onDeleteClick;
onDeleteClick = _id => {
//https://clothmeasurement.herokuapp.com
axios.delete('http://localhost:5000/todos/list/delete/' + _id)
.then(res => console.log(res.data));
this.setState({
exercises: this.state.todos.filter(el => el._id !== _id)
})
// Refresh the page to show the new list of todos after deleting 
window.location = '/list';
};

return currentTodos.map(function (currentTodo, i, _id) {
return <Todo todo={ currentTodo}
key={ i }
id={ _id }
onDeleteClick={ onDeleteClick }
loading={loading}
/>;
})        
}

render() {
const { auth } = this.props;
if (!auth.uid) return <Redirect to='/' />
// Change page
const paginate = pageNumber => this.setState({
currentPage: pageNumber
});

const { currentPage, todosPerPage,word,todos,initialTodos } = this.state;
const indexOfLastTodo = currentPage * todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
const currentTodos = initialTodos.length > todos.length ? (todos.slice(indexOfFirstTodo, indexOfLastTodo)) : (initialTodos.slice(indexOfFirstTodo, indexOfLastTodo) );
const handleRefresh = e => {
window.location = '/list';
}

const handleChange = e => {
this.setState({word:e});
//The list for the current page
let oldestList = currentTodos;
// All the list
let oldList = todos;
//   .map(todo => {
//         return {name:todo.name,email:todo.email,...todo};
//     });
console.log(oldList);
console.log(oldestList);
if (word !== ""){
let newList = [];

console.log(word.valueOf());

newList = oldList.filter( todo => 
     todo.name.includes(word)  || todo.email.includes(word) 
 );
console.log(newList);
console.log(oldestList);
console.log(oldList);
console.log(initialTodos);

this.setState({
todos: newList
});
} else {
this.setState({
todos: initialTodos
});             
}
};
return (
<>              
<div>
<Filter value={word} 
handleRefresh={handleRefresh} 
handleChange={e => handleChange(e.target.value)} />   
<h3>Customers Measurement List</h3>
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
</>
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
