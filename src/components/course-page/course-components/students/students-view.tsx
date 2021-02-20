import React from 'react';

import { Container, FormControl } from 'react-bootstrap';

import { StudentForCourseList as StudentType } from '../../../../models/student';
import { Student } from './student-item';

import './students-style.css';

type Props = {
    students: Array<StudentType>;
    filteredStudents: Array<StudentType>;
    searchStudents: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchValue: string;
    role:string;
    remove: (arg1: string, arg2: string) => void;
}

export const Students = (props: Props) => {
    let students;

    if (props.searchValue.length) {
        students = props.filteredStudents.map(student => {
            return <Student
                username={student.username}
                name={student.name}
                avatar={student.avatar}
                key={student.username}
                role={props.role}
                remove={props.remove}
            />
        })
    } else {
        students = props.students.map(student => {
            return <Student
                username={student.username}
                name={student.name}
                avatar={student.avatar}
                key={student.username}
                role={props.role}
                remove={props.remove}
            />
        })
    }

    if (students.length || props.searchValue !== '') {
        return (
            <Container id="course-students" className="mt-2">
                <div>
                    <FormControl type="text" placeholder="Search students" onChange={props.searchStudents} />
                </div>
                <div id="student-list">
                    { students }
                </div>
                {
                    (props.searchValue !== '' && students.length === 0) &&
                    <div className="text-center f1 mt-5">
                        Couldn't find any students.
                    </div>
                }
            </Container>
        );
    } else {
        return (
            <Container id="course-students" className="text-center f1 mt-5">
                No students yet. Go to settings to add students.
            </Container>
        );
    }
}
