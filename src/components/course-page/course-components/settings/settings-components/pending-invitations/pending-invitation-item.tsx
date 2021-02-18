import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { DeleteCourseInvitation } from '../../../../../../services/course-service';
import { showAxiosResponseErrors } from '../../../../../../services/error-handler-service';
import { confirm, success } from '../../../../../../services/notification-service';
import { DeleteIcon, Div } from '../attachments/attachment-style';
import { Status } from './style';

interface Invitation {
    sender: string;
    created_at: Date;
    expiry_date: Date;
    status: string;
    type: string;
    email: string;
    token: string;
}

type Props = {
    invitation: Invitation;
    courseOwner: string;
    courseCode: string;
    token: string;
    removeInvitation: (token: string) => void;
};


export const PendingInvitationItem = (props: Props) => {
    const mdScreen = window.innerWidth < 600

    const [deleting, setDeleting] = useState(false);
    const status = props.invitation.status;

    const deleteInvitation = () => {
        confirm('Are you sure?', 'You won\'t be able to restore this attachment')
        .then((result) => {
            if (!result.isConfirmed) {
                return;
            }

            setDeleting(true);

            DeleteCourseInvitation(props.courseOwner, props.courseCode, props.invitation.token, props.token)
            .then(() => {
                props.removeInvitation(props.invitation.token);
                success('Invitation has been canceled successfully');
            }).catch((err) => {
                showAxiosResponseErrors(err);
                setDeleting(false)
            });
        })
    }

    return (
        <Div className="p-3 mb-2 text-dark bg-g-dark">
            <div className={`${!mdScreen &&'float-left'} link`}>
                    {
                        props.invitation.type.toLowerCase() === 'teacher' ?
                        <Status className="bg-dark text-light px-2 py-1 mr-1">
                        { props.invitation.type.toUpperCase() }
                        </Status>
                        :
                        <Status className="border border-gray px-2 py-1 mr-1">
                            { props.invitation.type.toUpperCase() }
                        </Status>
                    }
                <span className="px-2 py-1">
                    { props.invitation.email }
                </span>
            </div>
            <div className={`text-light ${!mdScreen ? 'float-right' : 'mt-3 text-right'}`}>
                {
                    (status === 'Pending' && !deleting) &&
                    <Status className="bg-info px-2 py-1 text-bold">
                        PENDING
                    </Status>
                }
                {
                    (status === 'Accepted' && !deleting) &&
                    <Status className="bg-success px-2 py-1 text-bold">
                        ACCEPTED
                    </Status>
                }
                {
                    (status === 'Rejected' && !deleting) &&
                    <Status className="bg-danger px-2 py-1 text-bold">
                        REJECTED
                    </Status>
                }
                {
                    (status === 'Expired' && !deleting) &&
                    <Status className="text-light bg-warning px-2 py-1 text-bold">
                        EXPIRED
                    </Status>
                }
                {
                    status === 'Pending' &&
                    <span>
                        {

                            deleting ? (
                                <CircleLoader size={25} color={"#9e4033"} loading={deleting} />
                            ) : (
                                mdScreen ? (
                                    <Button variant="danger" className="ml-2 mb-1 px-3 py-1" onClick={deleteInvitation}>
                                        DELETE
                                    </Button>
                                ): (
                                    <DeleteIcon className="ml-2" onClick={deleteInvitation} />
                                )
                            )
                        }
                    </span>
                }
            </div>
            <Div></Div>
        </Div>
    );
};