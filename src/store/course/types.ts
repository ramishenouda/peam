// Describing the shape of the system's slice of state
export interface CourseState {
    role: string;
    courseOwner: string;
    courseCode: string;
    courseTitle: string;
    courseDescription: string;
}

// Describing the different ACTION NAMES available
export const UPDATE_COURSE = "UPDATE_COURSE";

interface UpdateCourseAction {
    type: typeof UPDATE_COURSE;
    payload: CourseState;
}

export type CourseActionTypes = UpdateCourseAction;

