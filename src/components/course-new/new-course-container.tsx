import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useSelector } from 'react-redux';
import { SystemState } from '../../store/system/types';

import { CreateCourse } from '../../services/course-service';
import { NewCourse as course } from '../../models/course';

import { NewCourseView } from './new-course-view';
import { showAxiosResponseErrors } from '../../services/error-handler-service';

type Props = {
    
};

export const NewCourse = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);
    const [creating, setCreating] = useState(false);
    const [redirect, setRedirect] = useState('');

    const createCourse = (course: course) => {
        setCreating(true);
        CreateCourse(course, systemState)
            .then(() => {
                setRedirect(course.code);
            }).catch((err: AxiosError) => {
                showAxiosResponseErrors(err);
                setCreating(false);
            });
    }

    useEffect(() => {
        if(!systemState.username) {
            localStorage.removeItem('refresh_token');
            localStorage.setItem('redirect_to', '/new');
            window.location.reload();
        }
    }, [systemState])

    if (redirect)
        return <Redirect to={"/" + systemState.username + "/" + redirect} />
    return (
        <NewCourseView 
            createCourse={createCourse}
            creating={creating}
        />
    );
};