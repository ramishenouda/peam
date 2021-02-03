import { Link } from 'react-router-dom';

import './project-requirement-style.css'

interface Props {
    projectReqs: Array<JSX.Element>;
    courseOwner: string;
    courseTitle: string;
}

function ProjectRequirement(props: Props): JSX.Element {
    return (
        <div id="project-req">
            <h1 className="f2 overview-title">Project requirements</h1>
            <div>
                <Link to={`/${props.courseOwner}/${props.courseTitle}/add_project_requirement`} className="mb-2 mt-1 btn btn-dark">Add project requirement</Link>
            </div>
            { props.projectReqs }
        </div>
    )
}

export default ProjectRequirement;
