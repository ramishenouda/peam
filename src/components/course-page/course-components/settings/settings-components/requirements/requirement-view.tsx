import { useSelector } from 'react-redux';

import { CourseState } from '../../../../../../store/course/types';

import { Div } from './requirement-style';

import { ProjectRequirementItem } from './requirement-item-view';

type Props = {
}

export const ProjectRequirement = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    let projectReqs;

    if (courseState.requirements) {
        projectReqs = courseState.requirements.map((pr) =>
            <ProjectRequirementItem key={pr.uid}
                teacher={courseState.role === 'teacher'}
                projectReq={pr}
            />
        );
    }

    return (
        <div id="requirement">
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
