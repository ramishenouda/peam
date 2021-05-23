import axios, { AxiosRequestConfig } from 'axios';

import { SystemState } from '../store/system/types';

const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
  url: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: {},
};

export const createProject = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  teamTitle: string,
  system: SystemState,
  data: {}
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/{team_name}/project/
  options.url =
    baseURL +
    `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/${teamTitle}/project/`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.headers['Content-Type'] =
    'multipart/form-data; boundary=----WebKitFormBoundary1b4Bs104C6QhlnFO';
  options.method = 'POST';
  options.data = data;

  options.data = data;
  return await axios(options);
};

export const openFile = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  teamTitle: string,
  system: SystemState,
  project_title: string,
  file_path: string
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/{team_name}/project/{project_title}/files/{path}/
  options.url =
    baseURL +
    `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/${teamTitle}/project/${project_title}/files/${file_path}`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.headers['Content-Type'] =
    'multipart/form-data; boundary=----WebKitFormBoundary1b4Bs104C6QhlnFO';
  options.method = 'GET';

  return await axios(options);
};
