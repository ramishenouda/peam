import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { GetUserProfile } from '../../services/user-service';

import { SystemState } from '../../store/system/types';

import { SettingsView } from './settings-view';

type Props = {
    
};

export const Settings = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);

    const [options, setOptions] = useState({})

    useEffect(() => {
        GetUserProfile(systemState.username, systemState.token)
            .then((result) => {
                setOptions(result.data)
            }).catch((err) => {
                showAxiosResponseErrors(err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SettingsView options={options} />
    );
};
