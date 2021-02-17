import { TeamForCourseList } from "./team";

export interface Requirement {
    uid: string;
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
