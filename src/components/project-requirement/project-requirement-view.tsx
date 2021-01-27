import { Link } from 'react-router-dom';

import './project-requirement-style.css'

interface Props {
    projectReqs: Array<JSX.Element>;
}

function ProjectRequirement(props: Props): JSX.Element {
    return (
        <div id="project-req">

            <h1 className="f2 title">Project requirements</h1>
            <div className="mb-2">
                <hr className="title-hr" />
            </div>
            <Link to="/drashraf/advancedcompiler" className="mb-2 btn btn-dark">Add project requirement</Link>
            { props.projectReqs }
        </div>
    )
}

export default ProjectRequirement;
