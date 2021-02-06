import React from 'react';

import { Container, FormControl } from 'react-bootstrap';

import { StudentForCourseList as StudentType } from '../../../../models/student';
import { Student } from './student';

import './course-students-style.css';

type Props = {
    students: Array<StudentType>;
    filteredStudents: Array<StudentType>;
    searchStudents: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchValue: string;
    role:string;
}

function CourseStudents(props: Props) {
    let students;

    if (props.searchValue.length) {
        students = props.filteredStudents.map(student => {
            return <Student
                userName={student.username}
                fullName={student.fullName}
                pictureUrl={student.pictureUrl}
                key={student.username}
                role={props.role}
            />
        })
    } else {
        students = props.students.map(student => {
            return <Student
                userName={student.username}
                fullName={student.fullName}
                pictureUrl={student.pictureUrl}
                key={student.username}
                role={props.role}
            />
        })
    }

    if (students.length) {
        return (
            <Container id="course-students" className="mt-2">
                <div>
                    <FormControl type="text" placeholder="Search students" onChange={props.searchStudents} />
                </div>
                <div id="student-list">
                    { students }
                </div>
            </Container>
        );
    } else {
        return (
            <Container id="course-students" className="mt-2">
                No students yet. Go to settings to add students.
            </Container>
        );
    }
}

export default CourseStudents;
