import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import AnonymousRoute from './AnonymousRoute';
import ProtectedRoute from './ProtectedRoute';

import Home from './components/home/home-container';
import Register from './components/register/register-container';
import Login from './components/login/login-container';
import PasswordReset from './components/password-reset/password-reset-container';
import Course from './components/course-page/course-container';
import AddProjectRequirement from './components/project-requirement/add-project-requirement-page/add-project-requirement-container';

export const App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" render={() => <AnonymousRoute component={Home}/>} />
                <Route exact path="/join" render={() => <AnonymousRoute component={Register}/>} />
                <Route exact path="/login" render={() => <AnonymousRoute component={Login}/>} />
                <Route exact path="/password_reset" render={() => <AnonymousRoute component={PasswordReset}/> } />
                <Route exact path="/:owner/:courseName" render={() => <ProtectedRoute redirectTo="/login" component={Course}/>} />
                <Route exact path="/:owner/:courseName/add_project_requirement" render={() => <ProtectedRoute redirectTo="/login" component={AddProjectRequirement}/>} />
                <Route render={() => <Redirect to={{ pathname: '/' }}/>} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
