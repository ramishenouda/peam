import React from 'react';
import { NewCourseView } from './new-course-view';

import { NewCourse as course } from '../../models/course';


type Props = {
    
};

const createCourse = (course: course) => {
    console.log(course)
}

export const NewCourse = (props: Props) => {
    return (
        <NewCourseView 
            createCourse={createCourse}
        />
    );
};