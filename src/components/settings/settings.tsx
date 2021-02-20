import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { GetUserProfile } from '../../services/user-service';

import { SystemState } from '../../store/system/types';

import { SettingsView } from './settings-view';

type Props = {
    
};

interface Params {
    query: string;
}

export const Settings = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);

    const [tab, setTab] = useState(0);
    const [fetching, setFetching] = useState(true);
    const params: Params = useParams();

    const [options, setOptions] = useState({})

    useEffect(() => {
        GetUserProfile(systemState.username, systemState.token)
            .then((result) => {
                setOptions(result.data)
            }).catch((err) => {
                showAxiosResponseErrors(err);
            }).finally(() => {
                setFetching(false);
                if (params.query === 'profile') {
                    setTab(0);
                } else if (params.query === 'courses') {
                    setTab(2);
                } else if (params.query === 'settings') {
                    setTab(1);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (fetching) {
        return <div className="mt-5 f1 text-center">
            Loading.....
        </div>
    }
    return (
        <SettingsView tab={tab} options={options} />
    );
};
