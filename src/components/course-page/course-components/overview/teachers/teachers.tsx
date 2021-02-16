import { Link } from "react-router-dom";
import { Teacher } from "../../../../../models/teacher";

type Props = {
    teachers: Array<Teacher>
}

export const Teachers = (props: Props) => {
    let teachers;

    if (props.teachers.length) {
        teachers = props.teachers.map(item => {
            return (
                <p key={item.username}>
                    <img src={'https://cdn2.iconfinder.com/data/icons/education-people/512/22-512.png'}
                        className="mr-2"
                        alt='teacher'
                        width='40px'
                        height='40px'
                    />
                    <Link to={"/" + item.username} className="link">
                        { item.full_name ? item.full_name : item.username }
                    </Link>
                </p>
            )
        })
    }

    return (
        <div>
            { teachers ? teachers : (
                <div>
                    Error while loading the teachers. Please reloard the page. 
                </div>
            )}
        </div>
    )
} 