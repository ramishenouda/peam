import { useSelector } from 'react-redux';

import { CourseState } from '../../../../../../store/course/types';

import { Div } from './project-requirement-style';

import { ProjectRequirementItem } from './project-requirement-item';


import './project-requirement-style.css';


type Props = {
}

export const ProjectRequirement = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    let projectReqs;

    if (courseState.projectRequirements) {
        projectReqs = courseState.projectRequirements.map((pr) =>
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
            <Div>
                { projectReqs && projectReqs }
                { !projectReqs && (
                        <div className="py-5 f1 text-center">
                            No project requirements yet.
                        </div>
                    )
                }
            </Div>
        </div>
    )
}

export default ProjectRequirement;
