import React, { useEffect, useState } from 'react';

import { useParams } from "react-router";

import Navbar from '../navbar/navbar-container';

import course from '../../models/course';
import { GetCourse } from '../../services/course-service';

import CourseView from './course-view';

function Course () {
    const initialCourse: course = {
        attachments: [],
        code: '',
        description: '',
        owner: '',
        projectRequirements: [],
        role: '',
        title: '',
        uid: '',
    }

    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [course, setCourse] = useState(initialCourse);

    const params: any = useParams();

    console.log(params);

    useEffect(() => {
        const owner = params.owner;
        const courseName = params.courseName;
        GetCourse(owner, courseName)
            .then((result) => {
                setCourse(result.data);
            }).catch((err) => {
                setError(true);
                console.log(err);
            }).finally(() => {
                setFetching(false);
            });
    }, [params.courseName, params.owner])

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
            <Navbar />
            <div id="course">
                { data }
            </div>
        </>
    );
}

export default Course;
