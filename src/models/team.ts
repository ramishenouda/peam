import { StudentForCourseList } from './student';

export interface Team {
    uid: string;
    id?: string;
    title: string;
    description: string;
    students: Array<StudentForCourseList>;
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
