import React, { Component } from 'react';
import { UserForRegistration as User } from '../../models/user';
import Navbar from '../navbar/navbar-container';

import PasswordResetView from './password-reset-view'

class PasswordReset extends Component {
    reset = (user: User) => {
        console.log("reset")
    }

    render() {
        return (
            <>
                <Navbar 
                    hide={true}
                />
                <PasswordResetView
                    register={this.reset}
                />
            </>
        );
    }
}

export default PasswordReset
