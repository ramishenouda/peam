import React, { Component } from 'react';
import { UserForRegistration as User } from '../../models/user';
import Navbar from '../navbar/navbar-container';

import RegisterView from './register-view'

class Register extends Component {
    state = {
        emailPreferences: true,
        registering: false,
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log(name, value)
        if(name === 'emailPreferences')
            this.setState({[name]: !this.state.emailPreferences})
        else 
            this.setState({[name]: value});
    };

    register = (user: User) => {
        this.setState({'registering': true})
        console.log(user);
    }

    render() {
        return (
            <>
            <Navbar signUp={false} />
            <RegisterView
                handleChange={this.handleChange}
                register={this.register}
                registering={this.state.registering}
                emailPreferences={this.state.emailPreferences}
            />
            </>
        );
    }
}

export default Register
