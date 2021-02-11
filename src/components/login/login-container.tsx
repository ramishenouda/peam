import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { SignIn } from '../../services/auth-service';
import { UserForLogin as User } from '../../models/user';

import Navbar from '../navbar/navbar-container';
import LoginView from './login-view'

function Login() {
    const [logging, setLogging] = useState(false);

    const login = (user: User) => {
        setLogging(true);
        SignIn(user)
            .then((result) => {
                console.log(result);
            }).catch((err: AxiosError) => {
                console.log(err);
            });
    }

    return (
        <>
        <Navbar hide={true} />
        <LoginView
            login={login}
            logging={logging}
        />
        </>
    );
}

export default Login
