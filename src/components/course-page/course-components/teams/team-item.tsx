import { Link } from 'react-router-dom';

import { StudentForCourseList } from '../../../../models/student';

import defaultAvatar from '../../../../assets/student-avatar.png'; 
import { StyledDiv, StyledImg, StyledButton, Title } from './teams-style';


type Props = {
    name: string;
    students: Array<StudentForCourseList>;
};

export const TeamItem = (props: Props) => {
    const students = props.students.map(student =>
        <Link key={student.username + props.name} to={`/${student.username}`}>
            <StyledImg alt={`${student.username}`} className="mr-1" src={student.avatar ? student.avatar : defaultAvatar} />
        </Link>
    )

    return (
        <StyledDiv className="p-3 pb-5 mb-3">
            <div>
                <Link to="/" className="link f3 mr-3">
                    <Title>
                        { props.name }
                    </Title>
                </Link>
            </div>
            <div className="pb-3">
                {students}
            </div>
            <div className="text-right">
                <StyledButton variant="danger">Remove</StyledButton>
            </div>
        </StyledDiv>
    );
}
