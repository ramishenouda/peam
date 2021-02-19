import { StudentForCourseList } from './student';

export interface Team {
    uid: string;
    id?: string;
    title: string;
    description: string;
    students: Array<StudentForCourseList>;
}

export interface TeamForCourseList {
    uid: string;
    id?: string;
    title: string;
    description: string;
    students: Array<StudentForCourseList>;
}
