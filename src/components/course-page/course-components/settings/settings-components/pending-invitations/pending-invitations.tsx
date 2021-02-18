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
    token: string;
}

export const PendingInvitations  = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [invitations_data, setInvitations] = useState(Array<Invitation>());

    const removeInvitation = (token: string) => {
        setInvitations(prevState => prevState.filter(item => item.token !== token));
    }

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

    const invitations = invitations_data.map((item, index) => 
        <PendingInvitationItem 
            key={item.token} 
            invitation={item}
            courseCode={courseState.code}
            courseOwner={courseState.owner}
            token={systemState.token}
            removeInvitation={removeInvitation}
        />
    );

    return (
        <div>
            { invitations.length > 0 && invitations }
            { !invitations.length && 
                <div className="mt-5 text-center f1">
                    No pending invitations
                </div> 
            }
        </div>
    );
};