import { StudentForCourseList } from './student';

export interface TeamForCourseList {
    uid: string;
    id?: string;
    title: string;
    description: string;
    students: Array<StudentForCourseList>;
}
