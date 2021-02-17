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

    const initialCourse: course = {
        projectRequirements: [],
        attachments: [],
        students: [],
        teachers: [],
        code: '',
        description: '',
        owner: '',
        role: '',
        title: '',
        uid: '',
    }

    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [course, setCourse] = useState(initialCourse);

    useEffect(() => {
        const owner = params.owner;
        const code = params.code;

        GetCourse(owner, code)
            .then((result: AxiosResponse) => {
                const teachers: Array<Teacher> = result.data.teachers;
                const data: course = result.data;
                if (teachers.find(x => x.username === systemState.username)) {
                    setCourse({...result.data, role: 'teacher'});
                    dispatch(updateCourse({ 
                        courseId: data.uid, 
                        courseOwner: owner, 
                        courseCode: code, 
                        courseTitle: data.title, 
                        courseDescription: data.description, 
                        attachments: data.attachments,
                        projectRequirements: data.projectRequirements,
                        teachers: data.teachers,
                        role: 'teacher',
                    }));
                } else {
                    setCourse({...result.data, role: 'student'});
                    dispatch(updateCourse({ 
                        courseId: data.uid, 
                        courseOwner: owner, 
                        courseCode: code, 
                        courseTitle: data.title, 
                        courseDescription: data.description, 
                        attachments: data.attachments,
                        projectRequirements: data.projectRequirements,
                        teachers: data.teachers,
                        role: 'teacher',
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
                courseId: '',
                courseOwner: '',
                courseCode: '',
                courseTitle: '',
                courseDescription: '',
                role: '',
                attachments: [],
                projectRequirements: [],
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
            <CourseView
                course={course}
            />
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
