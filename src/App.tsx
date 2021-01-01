import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import AnonymousRoute from './AnonymousRoute';

import Home from './components/home/home-container';
import Register from './components/register/register-container';
import Login from './components/login/login-container';
import PasswordReset from './components/password-reset/password-reset-container';

export const App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" render={ () => <AnonymousRoute component={Home} /> } />
                <Route exact path="/join" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/password_reset" component={PasswordReset} />
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
