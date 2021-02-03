import { Button } from 'react-bootstrap'

type Props = {
    userName: string,
    fullName: string,
    pictureUrl: string
};

export const Student = (props: Props) => {
    return (
        <div className="mt-2" id="student">
            <div>
                <img 
                    className="profile-pic" 
                    src={`${props.pictureUrl}`} 
                    alt={props.fullName? props.fullName : props.userName} 
                />
                <span className="title">
                    {props.fullName? props.fullName : props.userName}
                </span>
            </div>
            <div className="remove-btn">
                <Button variant="danger">Remove</Button>
            </div>
        </div>
    );
};