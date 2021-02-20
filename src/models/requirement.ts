import { Attachment } from "./attachment";
import { TeamForCourseList } from "./team";

export interface Requirement {
    uid: string;
    course: string;
    title: string;
    description: string;
    from_dt: Date;
    to_dt: Date;
    teams: Array<TeamForCourseList>;
    attachments: Array<Attachment>
}

export interface RequirementForCreation {
    uid: string;
    course: string;
    title: string;
    description: string;
    from_dt: Date;
    to_dt: Date;
}

export interface RequirementForTeams {
    projectRequirement: string;
    id: string;
    teams: Array<TeamForCourseList>
}
