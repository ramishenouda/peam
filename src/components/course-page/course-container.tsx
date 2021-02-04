import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Navbar from '../navbar/navbar-container';

import course from '../../models/course';
import { GetCourse } from '../../services/course-service';

import CourseView from './course-view';

interface RouteInfo {
    owner: string;
    courseName: string;
}

interface IState {
    loading: boolean;
    course: course;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

class Course extends Component<ComponentProps, IState> {
    componentDidMount() {
        const owner = this.props.match.params.owner;
        const courseName = this.props.match.params.courseName;
        GetCourse(owner, courseName)
            .then((result) => {
                this.setState({ course: result.data, loading: false });
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <Navbar />
                <div id="course">
                    {
                        this.state === null ? (
                            <span> Loading </span>
                        ) : (
                            <CourseView 
                                course={this.state.course} 
                            />
                        )
                    }
                </div>
            </>
        );
    }
}

export default withRouter(Course);
