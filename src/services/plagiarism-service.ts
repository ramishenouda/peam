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
  threshold?: string
) => {
  // http://localhost:8000/api/v1/plagiarism/
  options.url = baseURL + 'plagiarism/?expand=matches.project';
  options.method = 'POST';
  options.headers['Authorization'] = 'Bearer ' + token;
  options.data = {
    threshold: threshold,
    project: project,
  };
  return await axios(options);
};
