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
    options.headers["Content-Type"] = "application/json"
    options.method = "GET";

    return (await axios(options));
}

export const GetUserProfile = async(username: string, token: string) => {
    // http://localhost:8000/api/v1/users/{username}/
    options.url = baseURL + `user/profile/?expand=*&expand=courses_owned.owner&expand=courses_taken.owner&expand=courses_taught.owner`
    options.method = "GET";
    options.headers["Authorization"] = "Bearer " + token;
    options.headers["Content-Type"] = "application/json"

    return (await axios(options));
}

export const UpdateUser = async(name: string, email: string, token: string) => {
    // http://localhost:8000/api/v1/user/
    options.url = baseURL + `user/`
    options.method = "PATCH";
    options.headers["Authorization"] = "Bearer " + token;
    options.headers["Content-Type"] = "application/json"

    options.data = {
        email: email,
        name: name
    }

    return (await axios(options));
}

// export const UpdateAvatar = async(avatar: any, token: string) => {
//     // http://localhost:8000/api/v1/user/avatar/
//     options.url = baseURL + `user/avatar/`
//     options.method = "PATCH";
//     options.headers["Authorization"] = "Bearer " + token;
//     options.headers["Content-Type"] = "multipart/form-data; boundary=----WebKitFormBoundaryWP4KnN0qX6fToVf3";
    
//     options.data = {
//         "avatar": "------WebKitFormBoundaryNujaYiLogb1FZ9Qz\r\nContent-Disposition: form-data; name=\"avatar\"; filename=\"59.png\"\r\nContent-Type: image/png\r\n\r\n\r\n------WebKitFormBoundaryNujaYiLogb1FZ9Qz--\r\n"
//     }

//     return (await axios(options));
// }
