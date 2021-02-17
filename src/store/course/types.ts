import { Requirement } from '../../models/requirement';
import { Attachment } from '../../models/attachment';
import { Teacher } from '../../models/teacher';

// Describing the shape of the system's slice of state
export interface CourseState {
    role: string;
    id: string;
    owner: string;
    ownerId: string;
    code: string;
    title: string;
    description: string;
    teachers: Array<Teacher>;
    requirements: Array<Requirement>;
    attachments: Array<Attachment>;
}

// Describing the different ACTION NAMES available
export const UPDATE_COURSE = "UPDATE_COURSE";

interface UpdateCourseAction {
    type: typeof UPDATE_COURSE;
    payload: CourseState;
}

export type CourseActionTypes = UpdateCourseAction;

