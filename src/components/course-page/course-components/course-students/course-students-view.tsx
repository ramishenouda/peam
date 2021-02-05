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
            <div>
                {
                    (props.role.toLowerCase() === 'teacher') &&
                    <p>
                        Go to settings to add students or teachers
                    </p>
                }
                <FormControl type="text" placeholder="Search students" onChange={props.searchStudents} />
            </div>
            <div id="student-list">
                { students }
            </div>
        </Container>
    );
}

export default CourseStudents;
