import { StudentForCourseList } from './student';

export interface TeamForCourseList {
    uid: string;
    title: string;
    description: string;
    students: Array<StudentForCourseList>;
}
