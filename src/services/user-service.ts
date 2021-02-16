import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

import { error, success } from './notifications-service';

import { SystemState } from '../store/system/types';

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

const filterColors = (inputValue: string) => {
    return [
        {
            "label": "Kandil",
            "value": "Kandil",
        },
        {
            "label": "Rami",
            "value": "rami",
        },
        {
            "label": "Sorya",
            "value": "sorya",
        }
    ].filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export const SearchUsers = (inputValue: string): Promise<Array<Object>> =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterColors(inputValue))
        }, 1000);
    });

/*
depreacted
export const GetCurrentUser = (): SystemState => {
    const token = localStorage.getItem('token');
    let currentUser: SystemState = {loggedIn: false, session: '', username: '', full_name: ''};

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
