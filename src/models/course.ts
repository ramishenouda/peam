import Attachment from "./attachment";
import ProjectRequirement from "./project-requirement";

import { Teacher } from "./teacher";
import { StudentForCourseList } from "./student";

export default interface Course {
    uid: string;
    title: string;
    code: string;
    description: string;
    owner: string;
    attachments: Array<Attachment>;
    projectRequirements: Array<ProjectRequirement>;
    teachers: Array<Teacher>;
    students: Array<StudentForCourseList>;
    role: string;
}

export interface NewCourse {
    title: string;
    code: string;
    description: string;
}
