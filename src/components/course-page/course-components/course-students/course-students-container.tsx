import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Student from '../../../../models/student-for-list';
import { GetCourseStudents } from '../../../../services/course-service'

import View from './course-students-view'

interface RouteInfo {
    owner: string;
    courseName: string;
}

interface IState {
    loading: boolean;
    students: Array<Student>;
    filterdStudents: Array<Student>
    searchValue: string
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

class CourseStudents extends Component<ComponentProps, IState> {
    componentDidMount() {
        const owner = this.props.match.params.owner;
        const courseName = this.props.match.params.courseName;

        GetCourseStudents(owner, courseName)
        .then((result) => {
            this.setState({ students: result.data.students, loading: false, searchValue: '' });
        }).catch((err) => {
            console.log(err);
        });
    }

    searchStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        if (searchValue === '') {
            this.setState({filterdStudents: [], searchValue: searchValue})
            return;
        }

        this.setState(prevState => {
            const filterStudents = prevState.students.filter(student => {
                return searchValue.trimStart().toLowerCase() === (
                    student.fullName.slice(0, searchValue.length).toLowerCase() || student.username.slice(0, searchValue.length).toLowerCase()
                )
            })

            return {
                filterdStudents: filterStudents,
                searchValue: searchValue
            }
        })
    }

    render() {
        return (
            <>
                {
                    this.state === null ? (
                        <div> Loading </div>
                    ) : (
                        <View 
                            searchStudents={this.searchStudents} 
                            students={this.state.students} 
                            filteredStudents={this.state.filterdStudents}
                            searchValue={this.state.searchValue}
                        />
                    )
                }
            </>
        );
    }
}

export default withRouter(CourseStudents);
