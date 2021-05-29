import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URI;

const options: AxiosRequestConfig = {
  url: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: {},
};

export const peamPlagiarism = async (
  project: string,
  token: string,
  threshold?: number
) => {
  // http://localhost:8000/api/v1/plagiarism/
  options.url = baseURL + 'plagiarism/';
  options.method = 'POST';
  options.headers['Authorization'] = 'Bearer ' + token;

  options.data = {
    threshold: threshold,
    project: project,
  };

  return await axios(options);
};

export const DetectPlagiarismForTwoFiles = async (
  firstProject: string,
  secondProject: string,
  firstFile: string,
  secondFile: string,
  token: string,
  htmlEncode: boolean = true,
  matchStart: string = '<span class="plagiarism-text">',
  matchEnd: string = '</span>'
) => {
  // http://localhost:8000/api/v1/plagiarism/compare/
  options.url = baseURL + 'plagiarism/compare/';
  options.method = 'POST';
  options.headers['Authorization'] = 'Bearer ' + token;

  options.data = {
    first_project: firstProject,
    second_project: secondProject,
    first_file: firstFile,
    second_file: secondFile,
    match_start_marker: matchStart,
    match_end_marker: matchEnd,
    html_encoded: htmlEncode,
  };

  return await axios(options);
};
