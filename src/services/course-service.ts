import axios from 'axios'

export default class CourseService {
    static baseURL = process.env.REACT_APP_API_URI;
    
    static options = {
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    static async GetCourse(owner: string, courseName: string)  {
        let url;
        if(process.env.NODE_ENV === 'development')
            url = this.baseURL + `${owner}/${courseName}`;
        else
            url = this.baseURL + `courses/${owner}/${courseName}`;

        return (await axios.get(url, this.options));
    }
}
