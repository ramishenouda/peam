import { useState, useEffect } from 'react';

import { Course } from '../../../../models/course';

import ProjectRequirement from '../../../project-requirement/project-requirement-course-list/project-requirement-container';
import { Attachments } from './attachments/attachments';
import { Teachers } from './teachers/teachers';

import './overview-style.css';

type Props = {
    course: Course,
}

export const OverView = (props: Props) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', setSize);

        return function cleanup () {
            window.removeEventListener('resize', setSize);
        }
    }, []);

    const setSize = () => {
        setWindowSize(window.innerWidth)
    }

    const isSmallScreen = windowSize < 769;

    return (
        <div id="course-over-view">
            <div>
                <ProjectRequirement 
                    courseOwner={props.course.owner}
                    courseCode={props.course.code}
                    projectReqs={props.course.projectRequirements}
                />
            </div>
            <div>
                {
                    !isSmallScreen &&
                    <div>
                        <h1 className={`f3 overview-title ${isSmallScreen && 'mt-2'}`}>
                            About
                        </h1>
                        <p className="overview-description mt-2">
                            { props.course.description }
                        </p>
                    </div>
                }
                <div className="separator">
                    <hr/>
                </div>
                <div>
                    <h1 className={`f3 overview-title ${isSmallScreen && 'mt-4 text-center'}`}>Teachers</h1>
                    {isSmallScreen && 
                        <div className="mb-2"> 
                            <hr style={{width: '140px', textAlign: 'center', margin: 'auto'}} />
                        </div>
                    }
                    <Teachers teachers={props.course.teachers}/>
                </div>
                <div className="separator">
                    <hr/>
                </div>
                <div>
                    <h1 className={`f3 overview-title ${isSmallScreen && 'mt-4 text-center'}`}>Attachments</h1>
                    {isSmallScreen && 
                        <div className="mb-2"> 
                            <hr style={{width: '140px', textAlign: 'center', margin: 'auto'}} />
                        </div>
                    }
                    <Attachments attachments={props.course.attachments}/>
                </div>
            </div>
        </div>
    );
}
