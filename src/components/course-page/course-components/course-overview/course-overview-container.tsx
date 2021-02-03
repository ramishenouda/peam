import React, { Component } from 'react';

import Course from '../../../../models/course';

import View from './course-overview-view'

type Props = {
    course: Course;
}

class CourseOverView extends Component<Props> {
    render() {
        return (
            <View course={this.props.course} />
        );
    }
}

export default CourseOverView;
