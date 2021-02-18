import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';

import { getCourseInvitationsList } from '../../../../../../services/course-service';
import { showAxiosResponseErrors } from '../../../../../../services/error-handler-service';

import { CourseState } from '../../../../../../store/course/types';
import { SystemState } from '../../../../../../store/system/types';
import { PendingInvitationItem } from './pending-invitation-item';


type Props = {
    
};

interface Invitation {
    sender: string;
    created_at: Date;
    expiry_date: Date;
    status: string;
    type: string;
    email: string;
}

export const PendingInvitations  = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [invitations_data, setInvitations] = useState(Array<Invitation>());

    useEffect(() => {
        getCourseInvitationsList(courseState.owner, courseState.code, systemState)
            .then((result: AxiosResponse) => {
                setInvitations(result.data.invitations);
            }).catch((err: AxiosError) => {
                showAxiosResponseErrors(err);
                setError(true);
            }).finally(() => setFetching(false));
    }, [courseState.owner, courseState.code, systemState])

    if (fetching) {
        return <div>
            Loading....
        </div>
    }

    if (error) {
        return <div>
            Error...try reloading...
        </div>
    }

    const invitations = invitations_data.map((item, index) => <PendingInvitationItem key={index + item.sender + item.status} invitation={item} />);

    return (
        <div>
            { invitations }
        </div>
    );
};