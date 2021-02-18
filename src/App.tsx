import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';

import AnonymousRoute from './AnonymousRoute';
import ProtectedRoute from './ProtectedRoute';

import { refreshToken } from './services/auth-service';
import { getCurrentUser } from './services/user-service';

import { updateSession } from './store/system/actions';

import Navbar from './components/navbar/navbar-container';
import HomePage from './components/home/home-container';
import RegisterPage from './components/register/register-container';
import LoginPage from './components/login/login-container';
import { Logout } from './components/logout/logout';
import PasswordResetPage from './components/password-reset/password-reset-container';
import { NewCourse } from './components/course-new/new-course-container';
import CoursePage from './components/course-page/course-container';
import { ActivateAccount } from './components/responses/activate-account';

const App = () => {
    const [fetchingToken, setFetchingToken] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        const getNewToken = () => {
            const _refreshToken = localStorage.getItem('refresh_token')
            if (_refreshToken) {
                refreshToken(_refreshToken)
                    .then((result: AxiosResponse) => {
                        const token = result.data['access'];
                        const user = getCurrentUser(token, '');
                        if(typeof user === "object") {
                            dispatch(updateSession(user));
                        }
                    }).catch((err) => {
                        localStorage.removeItem('refresh_token');
                        window.location.reload();
                    }).finally(() => {
                        setFetchingToken(false);
                    });
            } else {
                setFetchingToken(false);
            }
        }

        getNewToken();

        setInterval(() => {
            getNewToken();
        }, 600000);
    }, [dispatch])

    if (fetchingToken)
        return <>Loading......</>

    return (
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route exact path="/" render={() => <HomePage />} />
                <Route exact path="/join" render={() => <AnonymousRoute component={RegisterPage}/>} />
                <Route exact path="/signup/email/verify/:key" render={() => <AnonymousRoute component={ActivateAccount}/>} />
                <Route exact path="/login" render={() => <AnonymousRoute component={LoginPage}/>} />
                <Route exact path="/logout" render={() => <ProtectedRoute redirectTo="/login" component={Logout}/>} />
                <Route exact path="/password_reset" render={() => <AnonymousRoute component={PasswordResetPage}/> } />
                <Route exact path="/new" render={() => <ProtectedRoute redirectTo="/login" component={NewCourse}/>} />
                <Route exact path="/:owner/:code" render={() => <ProtectedRoute redirectTo="/login" component={CoursePage}/>} />
                <Route render={() => <Redirect to={{ pathname: '/' }}/>} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
