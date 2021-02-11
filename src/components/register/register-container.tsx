import React, { useState } from 'react';

import { SignUp } from '../../services/auth-service';
import { UserForRegistration as User } from '../../models/user';

import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { success, message } from '../../services/notifications-service';

import RegisterView from './register-view'
import { Redirect } from 'react-router-dom';
import { AxiosError } from 'axios';

function Register() {
    const [registering, setRegistering] = useState(false);
    const [loginRedirect, setLoginRedirect] = useState(false);

    const register = (user: User) => {
        setRegistering(true);

        SignUp(user)
            .then(() => {
                success('Registration successful', 'verficication code sent to your email', 
                    () => {
                        message('Verify your account then login here')
                    });
                setLoginRedirect(true);
            })
            .catch((err: AxiosError) => {
                showAxiosResponseErrors(err);
                setRegistering(false);
            });
    }

    if (loginRedirect)
        return <Redirect to="/login" />

    return (
        <>
        <RegisterView
            register={register}
            registering={registering}
        />
        </>
    );
}

export default Register
