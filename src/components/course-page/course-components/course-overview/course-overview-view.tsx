import { useState, useEffect } from 'react';

import Course from '../../../../models/course';

import ProjectRequirement from '../../../project-requirement/project-requirement-course-list/project-requirement-container';

import './course-overview-style.css';

type Props = {
    course: Course,
}

function CourseOverView(props: Props) {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', setSize);

        return function cleanup () {
            console.log('overview');
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
                    courseTitle={props.course.title} 
                    projectReqs={props.course.projectRequirements} 
                />
            </div>
            <div className="separator"></div>
            <div>
                {
                    !isSmallScreen &&
                    <div>
                        <h1 className={`f2 overview-title ${isSmallScreen && 'mt-2'}`}>
                            About
                        </h1>
                        <p>
                            {props.course.description}    
                        </p>
                    </div>
                }
                <div className="separator">
                    <hr/>
                </div>
                <div>
                    <h1 className={`f2 overview-title ${isSmallScreen && 'mt-4 text-center'}`}>Attachments</h1>
                    {isSmallScreen && 
                        <div className="mb-2"> 
                            <hr style={{width: '140px', textAlign: 'center', margin: 'auto'}} />
                        </div>
                    }
                    <div>                   
                        <p>
                            Lecture from last night
                        </p>
                        <p>
                            Lecture from last night
                        </p>
                        <p>
                            Lecture from last night
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseOverView;
