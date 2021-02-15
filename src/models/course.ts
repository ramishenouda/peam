import Attachment from "./attachment";
import ProjectRequirement from "./project-requirement";
import { StudentForCourseList } from "./student";

export default interface Course {
    uid: string;
    title: string;
    code: string;
    description: string;
    owner: string;
    attachments: Array<Attachment>;
    projectRequirements: Array<ProjectRequirement>;
    students: Array<StudentForCourseList>;
    role: string; // descripting current user's status to the course
}

export interface NewCourse {
    title: string;
    code: string;
    description: string;
}
