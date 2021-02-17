import { ProjectRequirement } from '../../models/project-requirement';
import { Attachment } from '../../models/attachment';
import { Teacher } from '../../models/teacher';

// Describing the shape of the system's slice of state
export interface CourseState {
    role: string;
    courseId: string;
    courseOwner: string;
    courseCode: string;
    courseTitle: string;
    courseDescription: string;
    teachers: Array<Teacher>;
    projectRequirements: Array<ProjectRequirement>;
    attachments: Array<Attachment>;
}

// Describing the different ACTION NAMES available
export const UPDATE_COURSE = "UPDATE_COURSE";

interface UpdateCourseAction {
    type: typeof UPDATE_COURSE;
    payload: CourseState;
}

export type CourseActionTypes = UpdateCourseAction;

