import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { CourseState } from '../../../store/course/types';

import projectReq from '../../../models/project-requirement';
import { ProjectRequirementItem } from './project-requirement-item';


import './project-requirement-style.css';


type Props = {
    projectReqs: Array<projectReq>;
    courseOwner: string;
    courseTitle: string;
}

function ProjectRequirement(props: Props): JSX.Element {
    const courseState: CourseState = useSelector((state: any) => state.course);
    let projectReqs;

    if (props.projectReqs) {
        projectReqs = props.projectReqs.map((pr) =>
            <div key={pr.uid} className='mb-4'>
                <ProjectRequirementItem
                    teacher={courseState.role === 'teacher'}
                    projectReq={pr}
                />
            </div>
        );
    }

    return (
        <div id="project-req">
            <h1 className="f3 overview-title">Project requirements</h1>
            <div>
                {
                    courseState.role === 'teacher' &&
                    <Link to={`/${props.courseOwner}/${props.courseTitle}/add_project_requirement`} 
                    className="mb-2 mt-1 btn btn-dark"
                    >
                        Add a project requirement
                    </Link>
                }
            </div>
            { projectReqs && projectReqs }
            { !projectReqs && (
                    <div className="mt-5 f1 text-center">
                        No project requirements yet.
                    </div>
                )
            }
        </div>
    )
}

export default ProjectRequirement;
