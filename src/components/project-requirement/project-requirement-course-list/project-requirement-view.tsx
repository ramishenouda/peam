import { Link } from 'react-router-dom';

import { CurrentUser } from '../../../services/auth-service';

import projectReq from '../../../models/project-requirement';
import { ProjectRequirementItem } from './project-requirement-item';


import './project-requirement-style.css'


type Props = {
    projectReqs: Array<projectReq>;
    courseOwner: string;
    courseTitle: string;
}

function ProjectRequirement(props: Props): JSX.Element {
    const currentUser = CurrentUser();

    const projectReqs = props.projectReqs.map((pr, index) =>
        <div key={pr.uid} className='mb-2'>
            <ProjectRequirementItem
                teacher={currentUser.role === 'teacher'}
                projectReq={pr}
            />
        </div>
    );

    return (
        <div id="project-req">
            <h1 className="f2 overview-title">Project requirements</h1>
            <div>
                {
                    (currentUser.userName === props.courseOwner) &&
                    <Link to={`/${props.courseOwner}/${props.courseTitle}/add_project_requirement`} 
                    className="mb-2 mt-1 btn btn-dark"
                    >
                        Add a project requirement
                    </Link>
                }
            </div>

            { projectReqs }
        </div>
    )
}

export default ProjectRequirement;
