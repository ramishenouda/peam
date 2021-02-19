import React from 'react';
import { useSelector } from 'react-redux';

import { CourseState } from '../../../../../../store/course/types';

import { RequirementItem } from './requirement-item';
import { AddRequirement } from './add-requirement';

import { Section } from '../../settings-style';
import { Div } from './requirement-style';

type Props = {
    showOptions?: boolean;
    showAdd?: boolean;
};

export const Requirements = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    let projectReqs;

    if (courseState.requirements) {
        projectReqs = courseState.requirements.map((requirement, index) =>
            <div className={`${index !== 0 && 'mt-3'}`} key={requirement.uid}>
                <RequirementItem 
                    requirement={requirement}
                    showOptions={props.showOptions}
                />
            </div>
        );
    }

    const Element = props.showAdd ? Section : Div;

    return (
        <Element>
            {
                props.showAdd &&
                <>
                    <AddRequirement />
                    {
                        courseState.requirements.length > 0 &&
                        <hr />
                    }
                </>
            }
            {
                courseState.requirements.length > 0 && 
                <div>
                    <div>
                        <p className="f2 peam-title-1">
                            {
                                props.showAdd ? (
                                    'Manage current requirements'
                                ) : (
                                    'Project requirements'
                                )
                            }
                        </p>
                    </div>
                    <div>
                        { projectReqs }
                    </div>
                </div>
            }
            {
                (courseState.requirements.length < 1 && !props.showAdd) && 
                <div className="mt-5 f1 text-center">
                    No requirements yet.
                </div>
            }
        </Element>
    )
};
