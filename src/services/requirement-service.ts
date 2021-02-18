import axios, { AxiosRequestConfig } from 'axios'

import { SystemState } from '../store/system/types';

import { RequirementForCreation as Requirement } from "../models/requirement";

const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
    url: '',
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
    }
};

export const CreateRequirement = async (owner: string, courseCode: string, requirement: Requirement, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/
    options.url = baseURL + `courses/${owner}/${courseCode}/requirements/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'POST';
    options.data = requirement;

    return (await axios(options));
}

export const UpdateRequirement = async (owner: string, courseCode: string, requirement: Requirement, title: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/
    options.url = baseURL + `courses/${owner}/${courseCode}/requirements/${title}/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'PATCH';
    options.data = requirement;

    return (await axios(options));
}

export const DeleteRequirement = async (owner: string, courseCode: string, title: string, system: SystemState) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/
    options.url = baseURL + `courses/${owner}/${courseCode}/requirements/${title}/`
    options.headers["Authorization"] = "Bearer " + system.token;
    options.method = 'DELETE';

    return (await axios(options));
}
