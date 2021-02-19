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

    const respond = (status: string) => {
        const title = status === 'Accepted' ? 'Are you sure you want to join the course?' : 'Are you sure you want to reject the invitation';
        confirm(title, '', `Yes ${status.slice(0, status.length - 2).toLocaleLowerCase()}`)
            .then((result) => {
                if (!result.isConfirmed) {
                    return;
                }

                RespondToCourseInvitation(params.token, status, systemState.token)
                    .then((result) => {
                        success(`${status} the course successfully`);
                        console.log(result);
                    }).catch((err) => {
                        showAxiosResponseErrors(err);
                        console.log(err);
                    });
            })
    }

    useEffect(() => {
        // getting the email and other data from the invitation
        RetreieveCourseInvitation(params.token)
            .then((result) => {
                const email = result.data.email
                setSender(result.data.sender.full_name === null ? result.data.sender.username : result.data.sender.full_name);
                setCourse(result.data.course.title + '|' + result.data.course.code);

                if (systemState.username === '' || !systemState.loggedIn) {
                    message(`Login or register to peam to be able to join the course`)
                    setRedirect('/login');
                    return;
                }

                // search using the email to get the username and compare current logged in user.
                if (email.length > 0) {
                    SearchUsers(email)
                        .then((result) => {
                            if (result.data.users.length < 1) {
                                error("You don't have access to this page");
                                setRedirect('/')
                                return;
                            }

                            const username = result.data.users[0].username
                            if (username) {
                                // if its not the invited user
                                if (username !== systemState.username) {
                                    console.log(username, systemState.username)
                                    error("You don't have access to this page");
                                    setRedirect('/');
                                }
                            }
                        }).catch((err) => {
                            console.log(err)
                            showAxiosResponseErrors(err);
                            setRedirect('/');
                        });
                }
            }).catch((err) => {
                showAxiosResponseErrors(err);
                setRedirect('/');
            });
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