import axios from 'axios'

import { UserForLogin, UserForRegistration } from "../models/user";

const baseURL = process.env.REACT_APP_API_URI;

const options = {
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    data: {
    }
};

export const SignUp = async (registerInfo: UserForRegistration) => {
    const url = baseURL + 'signup/';
    options.data = registerInfo;

    console.log(options);

    return (await axios.post(url, options));
}

export const SignIn = async (loginInfo: UserForLogin) => {
    const url = baseURL + 'auth/login/';
    const key = loginInfo.username.includes("@") ? 'email' : 'username';

    options.data = {
        [key]: loginInfo.username,
        "password": loginInfo.password
    }

    console.log(options);

    return (await axios.post(url, options));
}

export const Logout = () => {
    localStorage.clear();
}
