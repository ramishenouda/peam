import React from 'react';

import Course from '../../../../models/course';

import View from './course-overview-view'

type Props = {
    course: Course;
}

function CourseOverView(props: Props) {
    return (
        <View course={props.course} />
    );
}

export default CourseOverView;
