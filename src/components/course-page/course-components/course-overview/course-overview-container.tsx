import { Component } from 'react';

import Course from '../../../../models/course';

import View from './course-overview-view'

interface IState {
    course: Course;
}

class CourseOverView extends Component<IState> {
    render() {
        return (
            <View course={this.props.course} />
        );
    }
}

export default CourseOverView;
