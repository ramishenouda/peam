import { Student, StudentForCourseList } from './student';

export interface Team {
    name: string;
    students: Array<Student>;
}

export interface TeamForCreation {
    name: string;
    requirement: string;
}

export interface TeamForCourseList {
    uid: string;
    name: string;
    students: Array<StudentForCourseList>;
}
