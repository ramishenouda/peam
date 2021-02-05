import axios from 'axios'
import jwt_decode from "jwt-decode";

import { useSelector } from 'react-redux';

import { SystemState } from '../store/system/types';
import { UserForLogin } from "../models/user";


const baseURL = process.env.REACT_APP_API_URI;
const utils = '';

const options = {
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    data: {
    }
};

export const CurrentUser = (): SystemState => {
    const systemState = useSelector((state: any) => state.system);

    return systemState;
}

export const GetCurrentUser = (): SystemState => {
    const token = localStorage.getItem('token');

    let currentUser: SystemState = {loggedIn: false, session: '', userName: ''};
    if (token) {
        var decoded: SystemState;
         try {
            decoded = jwt_decode(token);
            decoded.loggedIn = true;
            currentUser = decoded;
        } catch (error) {
            localStorage.clear(); window.location.reload();
        }
    }

    return currentUser;
}

export const Login = async (loginInfo: UserForLogin) => {
    let url;

    options.data = {
        "email": loginInfo.email,
        "username": loginInfo.username,
        "password": loginInfo.password
    }

    if (process.env.NODE_ENV === 'development') {
        url = baseURL + 'login';
    } else {
        url = baseURL + utils + 'login';
    }

    console.log(options);

    return (await axios.post(url, options));
}

export const Logout = () => {
    localStorage.clear();
}
