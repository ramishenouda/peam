import { StudentForList } from './student';

export default interface TeamForList {
    uid: string;
    title: string;
    description: string;
    students: Array<StudentForList>;
}
