import { Link } from 'react-router-dom';

import { StyledDiv, StyledImg, StyledButton, Title } from './course-teams-style';


import { StudentForCourseList } from '../../../../models/student';

type Props = {
    title: string;
    description: string;
    students: Array<StudentForCourseList>;
};

function TeamItem(props: Props) {
    const students = props.students.map(student =>
        <Link key={student.username + props.title} to={`/${student.username}`}>
            <StyledImg alt={`${student.username}`} className="mr-1" src={student.avatar} />
        </Link>
    )

    let description;
    if (props.description.length > 130) {
        description = props.description.slice(0, 130) + '...';
    } else {
        description = props.description;
    }

    return (
        <StyledDiv className="p-3 pb-5 mb-3">
            <div>
                <Link to="/" className="link f3 mr-3">
                    <Title>
                        { props.title }
                    </Title>
                </Link>
            </div>
            <div className="my-2">
                {description}
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

export default TeamItem;
