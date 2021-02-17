import { useSelector } from 'react-redux';

import { CourseState } from '../../../../../../store/course/types';

import { Div } from './requirement-style';

import { RequirementItem } from './requirement-item';

type Props = {
}

export const ProjectRequirement = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    let projectReqs;

    if (courseState.requirements) {
        projectReqs = courseState.requirements.map((requirement, index) =>
            <>
                <RequirementItem key={requirement.uid}
                    requirement={requirement}
                />
                { index !== courseState.requirements.length - 1 && 
                    <div className="separator">
                        <hr/>
                    </div>
                }
            </>
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
