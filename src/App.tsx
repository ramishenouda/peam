import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/home-container';
import Register from './components/register/register-container';
import Login from './components/login/login-container';

export const App = () => {
    return (
        <React.Fragment>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/join" component={Register} />
            <Route exact path="/login" component={Login} />
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
