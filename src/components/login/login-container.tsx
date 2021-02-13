import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';

import { showAxiosResponseErrors } from '../../services/error-handler-service';

import { updateSession } from '../../store/system/actions';

import { SignIn } from '../../services/auth-service';
import { getCurrentUser } from '../../services/user-service';
import { UserForLogin as User } from '../../models/user';

import LoginView from './login-view'

function Login() {
    const [logging, setLogging] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch();

    const login = (user: User) => {
        setLogging(true);
        SignIn(user)
            .then((result: AxiosResponse) => {
                const accessToken = result.data['access_token'];
                const refreshToken = result.data['refresh_token'];
                
                const user = getCurrentUser(accessToken, refreshToken);
                if (typeof user === 'object') {
                    dispatch(updateSession(user));
                    setLoggedIn(true);
                }
            }).catch((err: AxiosError) => {
                showAxiosResponseErrors(err);
                setLogging(false);
            });
    }

    if (loggedIn) {
        const redirectTo = localStorage.getItem('redirect_to');
        if (redirectTo)
            localStorage.removeItem('redirect_to');

        return <Redirect to={redirectTo ? redirectTo : '/'} />
    }

    return (
        <>
        <LoginView
            login={login}
            logging={logging}
        />
        </>
    );
}

export default Login
