/*
    Takes a list of users and show them
*/

import { Link } from "react-router-dom";

import { Member } from "../../models/memeber";
import teacherAvatar from '../../assets/teacher-avatar.png';

type Props = {
    members: Array<Member>
}

export const ListMembers = (props: Props) => {
    let members;
    if (props.members) {
        members = props.members.map(item => {
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
            { members ? members : (
                <div>
                    Error while loading the teachers.<br/>Please reloard the page. 
                </div>
            )}
        </div>
    )
} 