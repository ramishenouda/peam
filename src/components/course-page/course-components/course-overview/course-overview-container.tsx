import { Component } from 'react';

import course from '../../../../models/course';

import View from './course-overview-view'

interface IState {
    loading: boolean;
    course?: course;
}

class CourseOverView extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <View />
        );
    }
}

export default CourseOverView;
