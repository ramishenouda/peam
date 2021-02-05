import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URI;
const utils = '';

const options = {
    headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    data: {
    }
};

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
