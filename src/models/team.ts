import { Project } from './project/project';
import { Student, StudentForCourseList } from './student';

export interface Team {
  uid?: string;
  name: string;
  students: Array<Student>;
  project: Project;
}

export interface TeamForCreation {
  uid?: string;
  name: string;
  requirement: string;
}

export interface TeamForCourseList {
  uid?: string;
  name: string;
  students: Array<StudentForCourseList>;
}
