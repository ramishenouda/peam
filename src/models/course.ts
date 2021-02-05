import Attachment from "./attachment";
import ProjectRequirement from "./project-requirement";

export default interface Course {
    uid: string;
    title: string;
    code: string;
    description: string;
    owner: string;
    attachments: Array<Attachment>;
    projectRequirements: Array<ProjectRequirement>;
    role: string; // descripting current user's status to the course
}
