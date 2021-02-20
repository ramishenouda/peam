import axios, { AxiosRequestConfig } from 'axios'

import { UserForLogin, UserForPasswordReset, UserForRegistration } from "../models/user";

const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
    url: '',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    data: { }
};

export const SignUp = async (registerInfo: UserForRegistration) => {
    options.url = baseURL + 'auth/signup/';
    options.method = 'post';
    options.data = registerInfo;

    return (await axios(options));
}

export const SignIn = async (loginInfo: UserForLogin) => {
    options.url = baseURL + 'auth/login/';
    options.method = 'post';

    const key = loginInfo.username.includes("@") ? 'email' : 'username';

    options.data = {
        password: loginInfo.password,
        [key]: loginInfo.username
    }

    return (await axios(options));
}

export const refreshToken = async(refreshToken: string) => {
    options.url = baseURL + 'auth/token/refresh/';
    options.method = 'post';

    options.data = {
        "refresh": refreshToken
    }

    return (await axios(options));
}

export const Logout = async () => {
    options.url = baseURL + 'auth/logout/';
    options.method = 'post';

    localStorage.clear();
    return (await axios(options));
}

export const Verify = async (key: string) => {
    // http://localhost:8000/api/v1/auth/signup/verify-email/
    options.url = baseURL + 'auth/signup/verify-email/';
    options.method = 'POST';
    options.data = {
        "key": key
    };

    return (await axios(options));
}

export const RequestPasswordReset = async(user: UserForPasswordReset) => {
    // http://localhost:8000/api/v1/auth/password/reset/
    options.url = baseURL + 'auth/password/reset/';
    options.method = 'POST';
    options.data = user;

    return (await axios(options));
}

export const PasswordReset = async(user: UserForPasswordReset) => {
    // http://localhost:8000/api/v1/auth/password/reset/confirm/
    options.url = baseURL + 'auth/password/reset/confirm/';
    options.method = 'POST';
    options.data = user;

    return (await axios(options));        
}
