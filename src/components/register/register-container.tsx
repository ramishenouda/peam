import React, { useState } from 'react';

import { SignUp } from '../../services/auth-service';
import { UserForRegistration as User } from '../../models/user';

import { success, error, message } from '../../services/notifications-service';

import Navbar from '../navbar/navbar-container';
import RegisterView from './register-view'
import { Redirect } from 'react-router-dom';
import { AxiosError } from 'axios';

function Register() {
    const [registering, setRegistering] = useState(false);
    const [loginRedirect, setLoginRedirect] = useState(false);

    const register = (user: User) => {
        setRegistering(true);

        SignUp(user)
            .then((result) => {
                success('Registration successful', 'verficication code sent to your email', () => {
                    message('Verify your account then login here')
                });
                setLoginRedirect(true);
            }).catch((err: AxiosError) => {
                const res = err.response?.data;
                let message = '';
                for (const ms in res)
                    message += res[ms] + '\n';
            
                error('Error while registering', message);
                setRegistering(false);
            });
    }

    if (loginRedirect)
        return <Redirect to="/login" />

    return (
        <>
        <Navbar signUp={false} />
        <RegisterView
            register={register}
            registering={registering}
        />
        </>
    );
}

export default Register
