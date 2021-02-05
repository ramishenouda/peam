import { TeamForCourseList as team } from '../../../../models/team';

import './course-teams-style.css'

type Props = {
    teams: Array<team>;
    role: string;
}

function CourseTeams(props: Props) {
    return (
        <div>
            Course Teams
        </div>
    );
}

export default CourseTeams;
