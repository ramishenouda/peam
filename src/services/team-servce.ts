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

export const GetCourseAttachments = async (owner: string, courseCode: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/
    options.url = baseURL + `courses/${owner}/${courseCode}/attachments/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'GET';

    return (await axios(options));
}