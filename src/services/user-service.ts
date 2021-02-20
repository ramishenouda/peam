import axios, { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

import { error, success } from './notification-service';

import { SystemState } from '../store/system/types';


const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
    url: '',
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
    },
    data: { }
};


export const CurrentUser = (): SystemState => {
    const systemState = useSelector((state: any) => state.system);

    return systemState;
}

export const getCurrentUser = (token: string, refreshToken: string): SystemState | boolean => {
    try {
        const decodedToken: SystemState = jwt_decode(token);
        const user: SystemState = decodedToken;
        user.loggedIn = true;
        user.token = token;

        if (refreshToken !== '') {
            jwt_decode(refreshToken);
            success("Login successful")
            localStorage.setItem('refresh_token', refreshToken);
        }
        
        return user;
    } catch (err) {
        localStorage.clear();
        error('An error occurred please try to login again.', '', 
            () => {
                window.location.reload();
                localStorage.clear();
            });

        localStorage.clear();

        return false;
    }
}

export const SearchUsers = async (inputValue: string) => {
    // http://localhost:8000/api/v1/users/?search=ramishenouda
    options.url = baseURL + `users/?search=${inputValue}`
    options.method = "GET";

    return (await axios(options));
}

/*
depreacted
export const GetCurrentUser = (): SystemState => {
    const token = localStorage.getItem('token');
    let currentUser: SystemState = {loggedIn: false, session: '', username: '', name: ''};

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
*/
