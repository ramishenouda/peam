import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import CourseService from '../../services/course-service';
import CourseView from './course-view';


interface RouteInfo {
    id: string
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

class Course extends Component<ComponentProps> {
    state = {
        loading: true,
        data: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        CourseService.GetCourse(id)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <CourseView name="PEAM" />
        );
    }
}

export default withRouter(Course);
