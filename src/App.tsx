import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/home-container';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
        </Router>
    );
}

export default App;
