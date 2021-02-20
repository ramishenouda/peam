import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";

import { Container } from "react-bootstrap";

import { RetreieveCourseInvitation, RespondToCourseInvitation } from "../../services/course-service";
import { confirm, success, error, message } from "../../services/notification-service";
import { showAxiosResponseErrors } from "../../services/error-handler-service";

import { SystemState } from "../../store/system/types";

import { Accept, Reject } from './style';
import { SearchUsers } from "../../services/user-service";

type Props = {
    
};

interface RespondParams {
    token: string;
    owner: string;
    code: string;
}

export const RespondCourse = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);
    const params: RespondParams = useParams();
    const [redirect, setRedirect] = useState('');
    const [sender, setSender] = useState('');
    const [course, setCourse] = useState('');
    const [fetching, setFetching] = useState(true);

    const respond = (status: string) => {
        const title = status === 'Accepted' ? 'Are you sure you want to join the course?' : 'Are you sure you want to reject the invitation';
        confirm(title, '', `Yes ${status.slice(0, status.length - 2).toLocaleLowerCase()}`)
            .then((result) => {
                if (!result.isConfirmed) {
                    return;
                }

                RespondToCourseInvitation(params.token, status, systemState.token)
                    .then(() => {
                        success(`${status} the course successfully`);
                        setRedirect('/');
                    }).catch((err) => {
                        showAxiosResponseErrors(err);
                    });
            })
    }

    useEffect(() => {
        if (systemState.username === '' || !systemState.loggedIn) {
            message(`Login or register to peam to be able to join the course`)
            setRedirect('/login');
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (redirect !== '') {
        return <Redirect to={redirect} />
    }

    return (
        <Container className="text-center my-5 py-5">
            <div className="f1 text-center mb-4">
                <a href="/ramishenouda" rel="noopener noreferrer" target="_blank" className="link mr-2 f1">
                    { sender }
                </a> 
                invites you to join 
                <strong className="f1 mx-2">
                    { course }
                </strong> 
                course
            </div>
            <Accept onClick={() => respond('Accepted')} className="p-5 bg-g-dark my-2 f1 text-light">
                Accept Invitation
            </Accept>
            <Reject onClick={() => respond('Rejected')} className="p-5 bg-g-gray my-2 f1 text-dark">
                Reject Invitation
            </Reject>
        </Container>
    );
};