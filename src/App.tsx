import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import { useDispatch } from 'react-redux';

import AnonymousRoute from './AnonymousRoute';
import ProtectedRoute from './ProtectedRoute';

import { GetCurrentUser } from './services/auth-service';
import { updateSession } from './store/system/actions'

import HomePage from './components/home/home-container';
import RegisterPage from './components/register/register-container';
import LoginPage from './components/login/login-container';
import PasswordResetPage from './components/password-reset/password-reset-container';
import CoursePage from './components/course-page/course-container';
import AddProjectRequirementPage from './components/project-requirement/add-project-requirement-page/add-project-requirement-container';

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const user = GetCurrentUser();
        dispatch(updateSession(user));

    }, [dispatch])

    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" render={() => <AnonymousRoute component={HomePage}/>} />
                <Route exact path="/join" render={() => <AnonymousRoute component={RegisterPage}/>} />
                <Route exact path="/login" render={() => <AnonymousRoute component={LoginPage}/>} />
                <Route exact path="/password_reset" render={() => <AnonymousRoute component={PasswordResetPage}/> } />
                <Route exact path="/:owner/:courseName" render={() => <ProtectedRoute redirectTo="/login" component={CoursePage}/>} />
                <Route exact path="/:owner/:courseName/add_project_requirement" render={() => <ProtectedRoute redirectTo="/login" component={AddProjectRequirementPage}/>} />
                <Route render={() => <Redirect to={{ pathname: '/' }}/>} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
