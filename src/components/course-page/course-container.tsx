import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Navbar from '../navbar/navbar-container';

import course from '../../models/course';
import CourseService from '../../services/course-service';

import CourseView from './course-view';
import CourseSkeleton from './course-skeleton';

interface RouteInfo {
    id: string
}

interface IState {
    loading: boolean;
    course?: course;
    activeTab: number; 
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

class Course extends Component<ComponentProps, IState> {
    state = {
        loading: true,
        course: undefined,
        activeTab: 0
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        CourseService.GetCourse(id)
            .then((result) => {
                this.setState({ course: result.data, loading: false});
            }).catch((err) => {
                console.log(err);
            });
    }

    tabHandler = (tab: number): void => {
        this.setState({ activeTab: tab });
    }

    render() {
        return (
            <>
            <Navbar />
            <main id="course">
                { this.state.loading ? (
                    <CourseSkeleton />
                ) : (
                    <CourseView 
                        course={this.state.course} 
                        activeTab={this.state.activeTab}
                        tabHandler={this.tabHandler}
                    />
                )}
            </main>
            </>
        );
    }
}

export default withRouter(Course);
