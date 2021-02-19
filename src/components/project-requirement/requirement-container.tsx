import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SystemState } from '../../store/system/types';
import { GetRequirement } from '../../services/requirement-service';

import { Requirement } from '../../models/requirement';

import { RequirementView } from './requirement-view';
import { showAxiosResponseErrors } from '../../services/error-handler-service';

type Props = {

};

interface Params {
    owner: string;
    code: string;
    title: string;
}

export const RequirementContainer = (props: Props) => {
    const params: Params = useParams();
    const systemState: SystemState = useSelector((state: any) => state.system);

    const initialReq: Requirement = {
        attachments: [],
        course: '',
        description: '',
        from_dt: new Date(),
        teams: [],
        title: '',
        to_dt: new Date(),
        uid: ''
    }

    const [requirement, setRequirement] = useState(initialReq)
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        GetRequirement(params.owner, params.code, params.title, systemState)
            .then((result) => {
                setRequirement(result.data);
            }).catch((err) => {
                showAxiosResponseErrors(err)
                setError(true);
            }).finally(() => setFetching(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (fetching) {
        return (
            <div className="f1 mt-5 text-center">
                Loading....
            </div>
        )
    }

    if (error) {
        return (
            <div className="f1 mt-5 text-center">
                Error while loading the requirement....
            </div>
        )
    }

    return (
        <RequirementView
            requirement={requirement}
            params={params}
        />
    );
};
