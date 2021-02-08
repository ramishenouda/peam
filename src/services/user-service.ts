import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

import { SystemState } from '../store/system/types';

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
