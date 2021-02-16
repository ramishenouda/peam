import axios, { AxiosRequestConfig } from 'axios'

import { SystemState } from '../store/system/types';

import { NewCourse } from '../models/course';
import { Attachment } from '../models/attachment';

const baseURL = process.env.REACT_APP_API_URI;
const utils = '';

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
        owner_id: system.user_id,
        ...course
    }

    console.log(options);

    return (await axios(options));
}

export const GetCourse = async (owner: string, courseCode: string) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/
    options.url = baseURL + `courses/${owner}/${courseCode}/`
    options.method = 'GET';

    return (await axios(options));
}

export const GetCourseStudents = async (owner: string, courseName: string) => {
    let url;
    if(process.env.NODE_ENV === 'development')
        url = baseURL + `${owner}/${courseName}`;
    else
        url = baseURL + utils + `courses/${owner}/${courseName}/students`;

    return (await axios.get(url, options));
}

export const GetCourseTeams = async (owner: string, courseName: string) => {
    let url;
    if(process.env.NODE_ENV === 'development')
        url = baseURL + `${owner}/${courseName}`;
    else
        url = baseURL + utils + `courses/${owner}/${courseName}/teams`;

    return (await axios.get(url, options));
}

export const GetCourseAttachments = async (owner: string, courseCode: string) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/attachments/
    options.url = baseURL + `courses/${owner}/${courseCode}/attachments/`
    options.method = 'GET';

    return (await axios(options));
}

export const AddCourseAttachment = async (owner: string, courseCode: string, attachment: Attachment) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/attachments/
    options.url = baseURL + `courses/${owner}/${courseCode}/attachments/`
    options.method = 'POST';
    options.data = attachment;

    return (await axios(options));
}