import { TeamForCourseList } from "./team";

export interface ProjectRequirement {
    uid: string;
    title: string;
    description: string;
    from_dt: Date;
    to_dt: Date;
}

export interface ProjectRequirementForTeams {
    projectRequirement: string;
    id: string;
    teams: Array<TeamForCourseList>
}
