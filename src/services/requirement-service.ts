import axios, { AxiosRequestConfig } from 'axios'

import { RequirementForCreation as Requirement } from "../models/requirement";

const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
    url: '',
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
    }
};

export const CreateRequirement = async (owner: string, courseCode: string, requirement: Requirement) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/
    options.url = baseURL + `courses/${owner}/${courseCode}/requirements/`
    options.method = 'POST';
    options.data = requirement;

    return (await axios(options));
}

export const UpdateRequirement = async (owner: string, courseCode: string, requirement: Requirement, title: string) => {
    // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/
    options.url = baseURL + `courses/${owner}/${courseCode}/requirements/${title}/`
    options.method = 'PATCH';
    options.data = requirement;

    return (await axios(options));
}
