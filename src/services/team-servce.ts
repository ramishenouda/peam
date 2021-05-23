import axios, { AxiosRequestConfig } from 'axios';

import { SystemState } from '../store/system/types';

import { TeamForCreation } from '../models/team';

const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
  url: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: {},
};

export const CreateTeam = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  system: SystemState,
  team: TeamForCreation
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/
  options.url =
    baseURL + `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.method = 'POST';
  options.data = team;

  return await axios(options);
};

export const GetTeam = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  system: SystemState,
  teamName: string
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/{team_name}/
  options.url =
    baseURL +
    `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/${teamName}?expand=students&expand=project.project_zip`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.method = 'GET';

  return await axios(options);
};

export const DeleteTeam = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  system: SystemState,
  team: string
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/{team_name}/

  options.url =
    baseURL +
    `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/${team}`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.method = 'DELETE';

  return await axios(options);
};

export const UpdateTeam = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  system: SystemState,
  team: string,
  data: { name: string; requirement: string }
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/{team_name}/

  options.url =
    baseURL +
    `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/${team}/`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.method = 'PATCH';

  options.data = data;
  return await axios(options);
};
