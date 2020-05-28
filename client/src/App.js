// import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import CreateTodo from "./components/create-todo.component";
// import EditTodo from "./components/edit-todo.component";
// import TodosList from "./components/todos-list.component";
// import 'bootstrap/dist/css/bootstrap.css';
// //import logo from "./logo.svg";
// import ShowTodo from "./components/show-todo.component";
// import Navbar from "./components/navbar.component"
// import CreateUser from "./components/create-user.components";
// import SignIn from './components/SignIn'
// import SignUp from "./components/SignUp";

// class App extends Component {
//  render() {
//        return (
//          <Router>
//          <div className="container">
//      <Navbar/>
//       <br />
// <Route path="/" exact component={TodosList} />
// <Route path="/edit/:id" component={EditTodo} /> 
// <Route path="/create" component={CreateTodo} /> 
// <Route path="/show/:id" component={ ShowTodo } /> 
// <Route path="/user" component={ CreateUser } />     
// <Route path="/signin" component={ SignIn} />  
// <Route path="/signup" component={ SignUp } />   
// </div> 

//       </Router>    
//       );
//       }
//     }

//   export default App;


// import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";
import 'bootstrap/dist/css/bootstrap.css';
import ShowTodo from "./components/show-todo.component";
import Navbar from "./components/navbar.component"
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import EditTodo from './components/edit-todo.component';
import CreateUser from './components/create-user.components';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br />
        <Switch>
          <Route path="/" exact component={ TodosList } />
          <Route path="/edit/:id" component={ EditTodo } />
          <Route path="/create" component={ CreateTodo } />
          <Route path="/show/:id" component={ ShowTodo } />
          <Route path="/user" component={ CreateUser } />
          <Route path="/signin" component={ SignIn } />
          <Route path="/signup" component={ SignUp } />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;

