import axios, { AxiosRequestConfig } from 'axios'

import { SystemState } from '../store/system/types';

import { CourseForUpdate, NewCourse } from '../models/course';
import { Attachment } from '../models/attachment';
import { UserToInviteToCourse } from '../models/user';

const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
    url: '',
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
    },
    data: { }
};

export const CreateCourse = async (course: NewCourse, system: SystemState) => {
    options.url = baseURL + 'courses/';
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'POST';

    options.data = {
        owner: system.user_id,
        ...course
    }

    return (await axios(options));
}

export const GetCourse = async (owner: string, courseCode: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/
    options.url = baseURL + `courses/${owner}/${courseCode}/?expand=*&omit=students`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'GET';

    return (await axios(options));
}

export const UpdateCourse = async (owner: string, courseCode: string, course: CourseForUpdate, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/
    options.url = baseURL + `courses/${owner}/${courseCode}/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'PATCH';
    options.data = course;

    return (await axios(options));
}

export const GetCourseAttachments = async (owner: string, courseCode: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/attachments/
    options.url = baseURL + `courses/${owner}/${courseCode}/attachments/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'GET';

    return (await axios(options));
}

export const AddCourseAttachment = async (owner: string, courseCode: string, attachment: Attachment, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/attachments/
    options.url = baseURL + `courses/${owner}/${courseCode}/attachments/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'POST';
    options.data = attachment;

    return (await axios(options));
}

export const DeleteCourseAttachment = async (owner: string, courseCode: string, attachmentId: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/attachments/{attachment_id}/
    options.url = baseURL + `courses/${owner}/${courseCode}/attachments/${attachmentId}/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'DELETE';

    return (await axios(options));
}

export const UpdateCourseAttachment = async (owner: string, courseCode: string, attachment: Attachment, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/attachments/{attachment_id}/
    options.url = baseURL + `courses/${owner}/${courseCode}/attachments/${attachment.uid}/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'PATCH';
    options.data = attachment;

    return (await axios(options));
}

export const InviteToCourse = async (owner: string, courseCode: string, users: UserToInviteToCourse, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/invitations/
    options.url = baseURL + `courses/${owner}/${courseCode}/invitations/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'POST';
    options.data = users;

    return (await axios(options));
}

export const getCourseInvitationsList = async (owner: string, courseCode: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/invitations/
    options.url = baseURL + `courses/${owner}/${courseCode}/invitations/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'GET';

    return (await axios(options));
}

export const DeleteCourseInvitation = async (invToken: string, token: string) => {
    // http://localhost:8000/api/v1/courses/invitations/{token}/
    options.url = baseURL + `courses/invitations/${invToken}/`
    options.headers["Authorization"] = "Bearer " + token;
    options.method = 'DELETE';

    return (await axios(options));
}

export const RespondToCourseInvitation = async (invToken: string, status: string, token: string) => {
    // http://localhost:8000/api/v1/courses/invitations/{token}/
    options.url = baseURL + `courses/invitations/${invToken}/`
    options.headers["Authorization"] = "Bearer " + token;
    options.method = 'POST';
    options.data = {
        "status": status
    }
    
    return (await axios(options));
}

export const RetreieveCourseInvitation = async (invToken: string, token: string) => {
    // http://localhost:8000/api/v1/courses/invitations/{token}/
    options.url = baseURL + `courses/invitations/${invToken}?expand=sender&expand=course`
    options.method = 'GET';
    options.headers["Authorization"] = "Bearer " + token;

    return (await axios(options));
}

export const GetCourseStudents = async (owner: string, courseCode: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/
    options.url = baseURL + `courses/${owner}/${courseCode}/?expand=students&omit=*`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'GET';

    return (await axios(options));
}

export const GetCourseTeams = async (owner: string, courseCode: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/
    options.url = baseURL + `courses/${owner}/${courseCode}/requirements/?expand=teams.students`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'GET';

    return (await axios(options));
}

export const GetCourseTeachers = async (owner: string, courseCode: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/teachers/
    options.url = baseURL + `courses/${owner}/${courseCode}/teachers/?expand=teacher`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'GET';

    return (await axios(options));
}

export const DeleteCourseTeacher = async (owner: string, courseCode: string, courseTeacher: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/teachers/{course_teacher}/
    options.url = baseURL + `courses/${owner}/${courseCode}/teachers/${courseTeacher}`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'DELETE';

    return (await axios(options));
}

export const DeleteCourseStudent = async (owner: string, courseCode: string, courseStudent: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/students/{course_student}/
    options.url = baseURL + `courses/${owner}/${courseCode}/students/${courseStudent}`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'DELETE';

    return (await axios(options));
}

export const DeleteCourse = async (owner: string, courseCode: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}//
    options.url = baseURL + `courses/${owner}/${courseCode}/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'DELETE';

    return (await axios(options));
}
