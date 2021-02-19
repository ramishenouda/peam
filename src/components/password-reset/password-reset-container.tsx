import React, { Component } from 'react';
import { UserForRegistration as User } from '../../models/user';

import PasswordResetView from './password-reset-view'

class PasswordReset extends Component {
    reset = (user: User) => {
        console.log("reset")
    }

    render() {
        return (
            <>
                <PasswordResetView
                    register={this.reset}
                />
            </>
        );
    }
}

export default PasswordReset
