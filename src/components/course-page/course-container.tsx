import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { updateCourse } from '../../store/course/actions';
import { CourseState } from '../../store/course/types';
import { SystemState } from '../../store/system/types';

import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { GetCourse } from '../../services/course-service';

import { Course as course } from '../../models/course';
import { Teacher } from '../../models/teacher';

import CourseView from './course-view';

interface CouserParams {
    owner: string;
    code: string;
}

function Course () {
    const dispatch = useDispatch()
    const params: CouserParams = useParams();

    const systemState: SystemState = useSelector((state: any) => state.system);

    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const owner = params.owner;
        const code = params.code;

        GetCourse(owner, code, systemState)
            .then((result: AxiosResponse) => {
                const teachers: Array<Teacher> = result.data.teachers;
                const data: course = result.data;
                if (teachers.find(x => x.username === systemState.username)) {
                    dispatch(updateCourse({
                        ownerId: data.owner.uid,
                        id: data.uid, 
                        owner: data.owner.username, 
                        code: code, 
                        title: data.title, 
                        description: data.description, 
                        attachments: data.attachments,
                        requirements: data.requirements,
                        teachers: data.teachers,
                        role: 'teacher',
                    }));
                } else {
                    dispatch(updateCourse({
                        ownerId: data.owner.uid,
                        id: data.uid, 
                        owner: data.owner.username, 
                        code: code, 
                        title: data.title, 
                        description: data.description, 
                        attachments: data.attachments,
                        requirements: data.requirements,
                        teachers: data.teachers,
                        role: 'student',
                    }));
                }
            }).catch((err: AxiosError) => {
                showAxiosResponseErrors(err);
                setError(true);
            }).finally(() => {
                setFetching(false);
            });

        return function cleanup () {
            const initialState: CourseState = {
                id: '',
                ownerId: '',
                owner: '',
                code: '',
                title: '',
                description: '',
                role: '',
                attachments: [],
                requirements: [],
                teachers: [],
            }

            dispatch(updateCourse(initialState));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let data;
    if (fetching) {
        data = <div> Loading.... </div>
    } else if (error) {
        data = <div> Error.... </div>
    } else {
        data =
            <CourseView />
    }

    return (
        <>
            <div id="course">
                { data }
            </div>
        </>
    );
}

export default Course;
