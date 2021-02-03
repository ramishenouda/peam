import React from 'react';
import { Container, Form, FormControl } from 'react-bootstrap'

import StudentType from '../../../../models/student-for-list';
import { Student } from './student'

import './course-students-style.css'

type Props = {
    students: Array<StudentType>;
    filteredStudents: Array<StudentType>;
    searchStudents: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchValue: string;
}

function CourseStudents(props: Props) {
    let students;
    if (props.searchValue.length > 0) {
        students = props.filteredStudents.map(student => {
            return <Student
                userName={student.username}
                fullName={student.fullName}
                pictureUrl={student.pictureUrl}
                key={student.username}
            />
        })
    } else {
        students = props.students.map(student => {
            return <Student
                userName={student.username}
                fullName={student.fullName}
                pictureUrl={student.pictureUrl}
                key={student.username}
            />
        })
    }

    return (
        <Container id="course-students" className="mt-2">
            <p>
                { }
            </p>
            <Form inline className="controls">
                <FormControl type="text" placeholder="Search" onChange={props.searchStudents} className="mr-sm-2" />
            </Form>
            <div id="student-list">
                { students }
            </div>
        </Container>
    );
}

export default CourseStudents;