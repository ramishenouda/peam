import React, { useState } from 'react';

import { SignUp } from '../../services/auth-service';
import { UserForRegistration as User } from '../../models/user';


import Navbar from '../navbar/navbar-container';
import RegisterView from './register-view'

function Register() {
    const [registering, setRegistering] = useState(false);

    const register = (user: User) => {
        setRegistering(true);

        SignUp(user)
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
    }

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
