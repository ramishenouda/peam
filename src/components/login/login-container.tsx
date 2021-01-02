import React, { Component } from 'react';
import { UserForRegistration as User } from '../../models/user';
import Navbar from '../navbar/navbar-container';

import LoginView from './login-view'

class Login extends Component {
    state = {
        emailPreferences: true,
        registering: false,
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if(name === 'emailPreferences')
            this.setState({[name]: !this.state.emailPreferences})
        else 
            this.setState({[name]: value});
    };

    register = (user: User) => {
        this.setState({'registering': true})
    }

    render() {
        return (
            <>
            <Navbar hide={true} />
            <LoginView
                handleChange={this.handleChange}
                register={this.register}
                registering={this.state.registering}
                emailPreferences={this.state.emailPreferences}
            />
            </>
        );
    }
}

export default Login
