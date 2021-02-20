import { Link } from "react-router-dom";

import { Teacher } from "../../../../../models/teacher";
import teacherAvatar from '../../../../../assets/teacher-avatar.png';

type Props = {
    teachers: Array<Teacher>
}

export const Teachers = (props: Props) => {
    let teachers;
    if (props.teachers.length) {
        teachers = props.teachers.map(item => {
            const pictureURL = item.avatar ? item.avatar : teacherAvatar
            return (
                <p key={item.username}>
                    <img src={pictureURL}
                        className="mr-2"
                        alt='teacher'
                        width='40px'
                        height='40px'
                    />
                    <Link to={"/" + item.username} className="link">
                        { item.name ? item.name : item.username }
                    </Link>
                </p>
            )
        })
    }

    return (
        <div>
            { teachers ? teachers : (
                <div>
                    Error while loading the teachers.<br/>Please reloard the page. 
                </div>
            )}
        </div>
    )
} 