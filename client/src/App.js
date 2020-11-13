import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";
import 'bootstrap/dist/css/bootstrap.css';
import ShowTodo from "./components/show-todo.component";
import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import React from 'react';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import EditTodo from './components/edit-todo.component';
import CreateUser from './components/create-user.components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App()  {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br />
        <Switch>
         
         <Route path="/" exact component={ TodosList } />  
          <Route path="/home" component={ Home } /> 
          <Route path="/edit/:id" component={ EditTodo } />
          <Route path="/create" component={ CreateTodo } />
          <Route path="/show/:id" component={ ShowTodo } />
          <Route path="/user" component={ CreateUser } />
          <Route path="/signin" component={ SignIn } />
          <Route path="/signup" component={ SignUp } />
        </Switch>
        <div>
        
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
