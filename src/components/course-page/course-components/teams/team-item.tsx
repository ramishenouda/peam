import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StudentForCourseList } from '../../../../models/student';

import { confirmText, error, success } from '../../../../services/notification-service';
import { showAxiosResponseErrors } from '../../../../services/error-handler-service';
import { DeleteTeam } from '../../../../services/team-servce';

import { CourseState } from '../../../../store/course/types';
import { SystemState } from '../../../../store/system/types';

import defaultAvatar from '../../../../assets/student-avatar.png'; 
import { StyledDiv, StyledImg, StyledButton, Title } from './teams-style';

type Props = {
    name: string;
    students: Array<StudentForCourseList>;
    role: string;
    reqTitle: string;
    removeTeam: (tile: string, teamTitle: string) => void;
};

export const TeamItem = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const remove = () => {
        confirmText(
            'You can\'t revert this', 
            `You will delete everything the students did.
                </br>type the team title to confirm: </br> <strong> ${props.name} </strong>`,
            'Team title'
        ).then(result => {
            if (!result.isConfirmed)
                return;
            
            const resultValue = result.value ? result.value : '';
            if(!resultValue)
                error('Title can\'t be empty or undefined')
            if (resultValue !== props.name)
                error('Titles don\'t match.')


            DeleteTeam(courseState.owner, courseState.code, props.reqTitle, systemState, props.name)
                .then((result) => {
                    success('Team deleted successfully');
                    props.removeTeam(props.reqTitle, props.name);
                }).catch((err) => {
                    showAxiosResponseErrors(err);
                });
        })
    }

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
            {
                props.role === 'teacher' &&
                <div className="text-right">
                    <StyledButton variant="danger" onClick={remove}>Remove</StyledButton>
                </div>
            }
        </StyledDiv>
    );
}
