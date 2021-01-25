import './project-requirement-style.css'

import projectReq from '../../models/project-requirement';
import { ProjectRequirementItem } from './project-requirement-item';

interface Props {
    projectReq: Array<projectReq>;
}

function ProjectRequirement(props: Props): JSX.Element {
    const projectReqs = props.projectReq.map(pr => 
        <ProjectRequirementItem key={pr.uid} projectReq={pr} />
    );

    return (
        <div id="project-req">
            { projectReqs }
        </div>
    )
}

export default ProjectRequirement;
