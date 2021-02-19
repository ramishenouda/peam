import { Attachment } from "./attachment";
import { RequirementForCreation as Requirement } from "./requirement";

import { Teacher } from "./teacher";
import { StudentForCourseList } from "./student";
import { User } from "./user";

export interface Course {
    uid: string;
    title: string;
    code: string;
    description: string;
    owner: User;
    attachments: Array<Attachment>;
    requirements: Array<Requirement>;
    teachers: Array<Teacher>;
    students: Array<StudentForCourseList>;
    role: string;
}

export interface CourseForUpdate {
    title: string;
    code: string;
    description: string;
    ownerId: string;
}

export interface NewCourse {
    title: string;
    code: string;
    description: string;
}
