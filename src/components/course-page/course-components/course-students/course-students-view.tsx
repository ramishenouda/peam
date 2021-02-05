import React from 'react';

import { Container, FormControl } from 'react-bootstrap';

import { CurrentUser } from '../../../../services/auth-service';

import { StudentForList as StudentType } from '../../../../models/student';
import { Student } from './student';

import './course-students-style.css'

type Props = {
    students: Array<StudentType>;
    filteredStudents: Array<StudentType>;
    searchStudents: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchValue: string;
    courseOwner: string;
}


function CourseStudents(props: Props) {
    let students;
    const currentUser = CurrentUser().userName;

    if (props.searchValue && props.searchValue.length > 0) {
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
                    (currentUser.toLowerCase() === props.courseOwner.toLowerCase()) &&
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
