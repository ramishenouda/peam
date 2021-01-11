import axios from 'axios'

export default class CourseService {
    static baseURL = process.env.REACT_APP_API_URI;
    
    static options = {
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    };

    static async GetCourse(id: string)  {
        const url = this.baseURL + 'course/' + id;
        return (await axios.get(url, this.options));
    }
}
