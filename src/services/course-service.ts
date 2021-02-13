import axios, { AxiosRequestConfig } from 'axios'

import { SystemState } from '../store/system/types';

import { NewCourse } from '../models/course';

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
    options.method = 'post';

    options.data = {
        owner_id: system.user_id,
        ...course
    }

    console.log(options);

    return (await axios(options));
}

export const GetCourse = async (owner: string, courseName: string) => {
    let url;
    if(process.env.NODE_ENV === 'development')
        url = baseURL + `${owner}/${courseName}`;
    else
        url = baseURL + `courses/${owner}/${courseName}`;

    return (await axios.get(url, options));
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
