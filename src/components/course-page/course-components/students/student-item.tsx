import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import defaultAvatar from '../../../../assets/student-avatar.png';
import { confirm } from '../../../../services/notification-service';

type Props = {
    userName: string,
    fullName: string,
    avatar: string
    role: string;
};

export const Student = (props: Props) => { 
    const remove = () => {
        confirm('', `Are you sure you want to remove </br> <strong> 
            ${props.fullName ? props.fullName : props.userName} </strong> 
            </br> he will be removed from any team he is in.`
        ).then(result => {
            if (!result.isConfirmed) {
                return;
            }

            console.log('Deleting...');
        })
    }

    return (
        <div className="mt-2" id="student">
            <div>
                <Link className="link" to={`/${props.userName}`}>
                    <img
                        className="profile-pic" 
                        src={`${props.avatar ? props.avatar : defaultAvatar}`} 
                        alt={props.fullName? props.fullName : props.userName} 
                    />
                    <span className="title link">
                        {props.fullName? props.fullName : props.userName}
                    </span>
                </Link>
            </div>
            <div className="remove-btn">
                {
                    props.role === 'teacher' && <Button variant="danger" onClick={remove}>Remove</Button>
                }
            </div>
        </div>
    );
};
