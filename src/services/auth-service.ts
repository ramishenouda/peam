import axios, { AxiosRequestConfig } from 'axios'

import { UserForLogin, UserForRegistration } from "../models/user";

const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
    url: '',
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
    },
    data: { }
};

export const SignUp = async (registerInfo: UserForRegistration) => {
    options.url = baseURL + 'signup/';
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

export const Logout = async () => {
    options.url = baseURL + 'auth/logout/';
    options.method = 'post';

    return (await axios(options));
}
