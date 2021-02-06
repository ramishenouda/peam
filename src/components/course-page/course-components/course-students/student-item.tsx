import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

type Props = {
    userName: string,
    fullName: string,
    pictureUrl: string
    role: string;
};

export const Student = (props: Props) => {

    return (
        <div className="mt-2" id="student">
            <div>
                <Link className="link" to={`/${props.userName}`}>
                    <img
                        className="profile-pic" 
                        src={`${props.pictureUrl}`} 
                        alt={props.fullName? props.fullName : props.userName} 
                    />
                    <span className="title">
                        {props.fullName? props.fullName : props.userName}
                    </span>
                </Link>
            </div>
            <div className="remove-btn">
                {
                    props.role === 'teacher' && <Button variant="danger">Remove</Button>
                }
            </div>
        </div>
    );
};
