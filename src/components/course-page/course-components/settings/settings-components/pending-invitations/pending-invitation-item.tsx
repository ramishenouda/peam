import React from 'react';
import { DeleteIcon, Div } from '../attachments/attachment-style';
import { Status } from './style';

interface Invitation {
    sender: string;
    created_at: Date;
    expiry_date: Date;
    status: string;
    type: string;
    email: string;
}

type Props = {
    invitation: Invitation;
};


export const PendingInvitationItem = (props: Props) => {
    const deleteInvitation = () => {
        console.log('delete');
    }

    return (
        <Div className="p-3 mb-2">
            <div className="float-left link">
                { props.invitation.email }
            </div>
            <div className="float-right">
                {
                    props.invitation.status === 'Pending' &&
                    <Status className="text-light bg-primary p-1 text-bold">
                        {props.invitation.status}
                    </Status>
                }
                {
                    props.invitation.status === 'Accepted' &&
                    <Status className="text-light bg-success p-1 text-bold">
                        {props.invitation.status}
                    </Status>
                }
                {
                    props.invitation.status === 'Rejected' &&
                    <Status className="text-light bg-danger p-1 text-bold">
                        {props.invitation.status}
                    </Status>
                }
                {
                    props.invitation.status === 'Expired' &&
                    <Status className="text-light bg-warning p-1 text-bold">
                        {props.invitation.status}
                    </Status>
                }
                <DeleteIcon className="ml-2 mb-1" onClick={deleteInvitation} />
            </div>
            <Div></Div>
        </Div>
    );
};