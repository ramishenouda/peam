import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import defaultAvatar from '../../../../assets/student-avatar.png';


type Props = {
    username: string,
    name: string,
    avatar: string
    role: string;
    remove: (arg1: string, arg2: string) => void;
};

export const Student = (props: Props) => { 
    return (
        <div className="mt-2" id="student">
            <div>
                <Link className="link" to={`/${props.username}`}>
                    <img
                        className="profile-pic" 
                        src={`${props.avatar ? props.avatar : defaultAvatar}`} 
                        alt={props.name? props.name : props.username} 
                    />
                    <span className="title link">
                        {props.name? props.name : props.username}
                    </span>
                </Link>
            </div>
            <div className="remove-btn">
                {
                    props.role === 'teacher' && <Button variant="danger" onClick={() => props.remove(props.username, props.name)}>Remove</Button>
                }
            </div>
        </div>
    );
};
