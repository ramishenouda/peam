import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import CourseView from './course-view';


interface RouteInfo {
    id: string
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

class Course extends Component<ComponentProps> {
    render() {
        const id = this.props.match.params.id;
        console.log(id);
        
        return (
            <CourseView name="PEAM" />
        );
    }
}

export default withRouter(Course);
