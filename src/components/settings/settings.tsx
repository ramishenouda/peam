import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { GetUser } from '../../services/user-service';

import { SystemState } from '../../store/system/types';
import { User } from '../../models/user';


import { SettingsView } from './settings-view';

type Props = {
    
};

export const Settings = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);
    const initialUser: User = {
        avatar: '',
        email: '',
        name: '',
        uid: '',
        username: ''
    }

    const [user, setUser] = useState(initialUser)
    useEffect(() => {
        GetUser(systemState.username, systemState.token)
            .then((result) => {
                if (result.data.users[0].username === systemState.username)
                    setUser(result.data.users[0]);
            }).catch((err) => {
                showAxiosResponseErrors(err);
            });
    }, [])

    return (
        <SettingsView user={user} />
    );
};