import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/navBar';
import Dashboard from './components/dashboard/dashboard';
import ProjectDetails from './components/projects/projectDetails'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/createProject';
import UpdateProject from './components/projects/updateProject';
import EditTodo from './components/edit-todo.component';
//import ShowTodo from './components/show-todo.component';
import CreateUser from './components/create-user.components';


function Apps() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Switch>

<Route path="/edit/:id" component={EditTodo} /> 

<Route path="/user" component={ CreateUser } /> 
                    <Route exact path='/' component={ Dashboard } />
                    <Route path='/project/:id' component={ ProjectDetails } />
                    <Route path='/signin' component={ SignIn } />
                    <Route path='/signup' component={ SignUp } />
                    <Route path='/create' component={ CreateProject } />
                    <Route path='/update/project/:id' component={ UpdateProject } />
                </Switch>
            </div>
        </BrowserRouter>

    );
}

export default Apps;
