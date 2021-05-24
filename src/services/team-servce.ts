import axios, { AxiosRequestConfig } from 'axios';

import { SystemState } from '../store/system/types';

import { TeamForCreation } from '../models/team';
import { UserToInviteToTeam } from 'models/user';

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

export const RemoveStudent = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  system: SystemState,
  team: string,
  team_student: string
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/{team_name}/students/{team_student}/

  options.url =
    baseURL +
    `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/${team}/students/${team_student}`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.method = 'DELETE';

  return await axios(options);
};

export const InviteToTeam = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  teamName: string,
  system: SystemState,
  students: UserToInviteToTeam
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/{team_name}/invitations/
  options.url =
    baseURL +
    `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/${teamName}/invitations/`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.method = 'POST';
  options.data = students;

  return await axios(options);
};

export const getTeamInvitationsList = async (
  owner: string,
  courseCode: string,
  reqTitle: string,
  teamName: string,
  system: SystemState
) => {
  // http://localhost:8000/api/v1/courses/{course_owner}/{course_code}/requirements/{requirement_title}/teams/{team_name}/invitations/
  options.url =
    baseURL +
    `courses/${owner}/${courseCode}/requirements/${reqTitle}/teams/${teamName}/invitations/`;
  options.headers['Authorization'] = 'Bearer ' + system.token;
  options.method = 'GET';

  return await axios(options);
};

export const DeleteTeamInvitation = async (
  token: string,
  authToken: string
) => {
  // http://localhost:8000/api/v1/courses/requirements/teams/invitations/{token}/
  options.url = baseURL + `courses/requirements/teams/invitations/${token}/`;
  options.headers['Authorization'] = 'Bearer ' + authToken;
  options.method = 'DELETE';

  return await axios(options);
};

export const RespondToTeamInvitation = async (
  invToken: string,
  status: string,
  token: string
) => {
  // http://localhost:8000/api/v1/courses/requirements/teams/invitations/{token}/
  options.url = baseURL + `courses/requirements/teams/invitations/${invToken}/`;
  options.headers['Authorization'] = 'Bearer ' + token;
  options.method = 'POST';
  options.data = {
    status: status,
  };

  return await axios(options);
};

export const RetreieveTeamInvitation = async (
  invToken: string,
  token: string
) => {
  // http://localhost:8000/api/v1/courses/requirements/teams/invitations/{token}/
  options.url =
    baseURL +
    `courses/requirements/teams/invitations/${invToken}?expand=sender&expand=course`;
  options.method = 'GET';
  options.headers['Authorization'] = 'Bearer ' + token;

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
