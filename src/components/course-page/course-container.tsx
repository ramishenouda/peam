import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Navbar from '../navbar/navbar-container';

import course from '../../models/course';
import CourseService from '../../services/course-service';

import CourseView from './course-view';

interface RouteInfo {
    owner: string;
    courseName: string;
}

interface IState {
    loading?: boolean;
    course: course;
    activeTab: number; 
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

class Course extends Component<ComponentProps, IState> {
    componentDidMount() {
        const owner = this.props.match.params.owner;
        const courseName = this.props.match.params.courseName;
        CourseService.GetCourse(owner, courseName)
            .then((result) => {
                this.setState({ course: result.data, loading: false, activeTab: 0});
                console.log(result)
            }).catch((err) => {
                console.log(err);
            });
    }

    tabHandler = (tab: number): void => {
        this.setState({ activeTab: tab });
    }

    render() {
        let info;
        // todo replace this with the skeleton loader   
        if(this.state === null) {
            info = <span> Loading </span>
        } else {
            info = <CourseView 
                course={this.state.course} 
                activeTab={this.state.activeTab}
                tabHandler={this.tabHandler}
            />
        }
        return (
            <>
                <Navbar />
                <main id="course">
                    { info }
                </main>
            </>
        );
    }
}

export default withRouter(Course);
