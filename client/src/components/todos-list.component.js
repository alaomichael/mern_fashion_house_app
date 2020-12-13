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
<td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.name }</td>
<td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.phone }</td>
<td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.email }</td>
<td className={ props.todo.todo_completed ? 'completed' : '' }>
<img src={ props.todo.url || props.todo.image || 'https://via.placeholder.com/100' } alt="Uploaded Style" height="100" width="100" />
</td>            
<td>{ moment(props.todo.date).fromNow() }</td>
<Link to={ "/show/" + props.todo._id }>
<Button
className="btn btn-success center-item"
>Show</Button>
</Link>
{ ` | ` }
<Link to={ "/edit/" + props.todo._id }>
<Button className='btn btn-primary center-item'
>Edit</Button>
</Link>
{ ` | ` }
<Button
className='btn btn-danger center-item'
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
todosPerPage: 20,
owneremail: owneremail,
word: '',
phone:0,
initialTodos:[],
localtodos:[]
};  
} 

//     handleSearch = (e) => {
// e.preventDefault();
// console.log(e);
// this.setState({ [e.target.name]: e.target.value });
//     };

componentDidMount() {
    
// Get local Storage Data
//this.getData();

//Get the Customers data based on the owneremail query

//const firebaseuser = this.props.auth.email;
// let firebaseuser = 'contactleomax@gmail.com';
//  axios.get('https://clothmeasurement.herokuapp.com/todos/?owneremail=' + firebaseuser)

let firebaseuser = 'leomax@gmail.com';
//const firebaseuser = this.props.auth.email;
axios.get('http://localhost:5000/todos/?owneremail=' + firebaseuser)
.then(response => {
this.setState({
todos: response.data,
username: response.data.username,
users: response.data.users,
initialTodos:response.data
});

//Save data in local Storage
this.setData();
// Get local Storage Data
//this.getData();

console.log(this.state);
})
.catch(function (error) {
console.log(error);
})
}

setData = () => {
//set data with localstorage
//get data from the state
let new_data =  this.state.todos;
console.log(new_data);
// if there is nothing save at the start, then save an empty
if(localStorage.getItem('myData') == null){
    localStorage.setItem('myData','[]');
}
//get old data and add it to the new data
 let old_data = JSON.parse(localStorage.getItem('myData'));
if (old_data.length !== new_data.length){
 // save the old + new data to local storage
localStorage.setItem('myData', JSON.stringify(new_data));
}

 let newest_data = JSON.parse(localStorage.getItem('myData'));
 console.log(newest_data);
}
 getData = () => {
   //  if there is indeed data then continue
   if(localStorage.getItem('myData') != null){
       let getTodos = JSON.parse(localStorage.getItem('myData'));
       console.log(getTodos);
       this.setState({localtodos: getTodos,
    
initialTodos:getTodos});
       console.log(this.state.initialTodos);
   }
}

todoList() {
const { currentPage, todosPerPage, loading, todos,initialTodos,localtodos } = this.state;
const indexOfLastTodo = currentPage * todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
const currentTodos = initialTodos.length > todos.length ? (todos.slice(indexOfFirstTodo, indexOfLastTodo)) : (initialTodos.slice(indexOfFirstTodo, indexOfLastTodo) );
// Delete Button Link
let onDeleteClick;
onDeleteClick = _id => {
//|| 'https://clothmeasurement.herokuapp.com/todos/delete'
axios.delete('https://clothmeasurement.herokuapp.com/todos/delete/' + _id)
.then(res => console.log(res.data));
this.setState({
exercises: this.state.todos.filter(el => el._id !== _id)
})

// Alert that the data has been deleted
alert(this.state.name + ` Data created successfully.`);
// Refresh the page to show the new list of todos after deleting 
window.location = '/';
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
if (!auth.uid) return <Redirect to='/home' />
// Change page
const paginate = pageNumber => this.setState({
currentPage: pageNumber
});

const { currentPage, todosPerPage,word,todos,initialTodos,localtodos } = this.state;
const indexOfLastTodo = currentPage * todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
const currentTodos = initialTodos.length > todos.length ? (todos.slice(indexOfFirstTodo, indexOfLastTodo)) : (initialTodos.slice(indexOfFirstTodo, indexOfLastTodo) );
const handleRefresh = e => {
window.location = '/';
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
if (word !== ""){
let newList = [];

console.log(word.valueOf());

newList = oldList.filter( todo => 
     todo.name.includes(word)  || todo.email.includes(word) 
 );

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
handleChange={e => handleChange(e.target.value)}
className="container"
/>   
<h3>Customers Measurement Records</h3>
<table className="table table-striped  table-responsive"
style={ { marginTop: 20,
margin:'auto' } } > 
<thead>
<th>Customer's Name</th>
<th>Phone</th>
<th>Email</th>
<th>Image Link</th>
<th>Due for Collection</th>
<th>Actions</th>
</thead>
<tbody>
{ this.state.todos.length ? this.todoList() :
    <>
    <div>
    <p 
    style={{color:'gray',
    fontSize: '50px',
    margin:'50px auto',
    padding:'50px',
    fontStyle:'bold',
    textAlign:'center'
}}>You have no data to display.Start Creating your Customer Measurement Record.</p>
    </div>
    </>  
}
</tbody>              
<Pagination todosPerPage={ todosPerPage } totalTodos={ this.state.todos.length } paginate={ paginate }  />
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
