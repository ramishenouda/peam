import { Component } from 'react';

import Course from '../../../../models/course';

import View from './course-overview-view'

interface IState {
    course: Course;
}

class CourseOverView extends Component<IState> {
    render() {
        const isSmallScreen = window.innerWidth < 769;
        return (
            <View isSamllScreen={isSmallScreen} course={this.props.course} />
        );
    }
}

export default CourseOverView;
