import Course from '../../../../models/course';
import ProjectRequirement from '../../../project-requirement/project-requirement-container';
import './course-overview-style.css';

type Props = {
    course: Course,
    isSamllScreen: boolean
}

function CourseOverView(props: Props) {
    return (
        <div id="course-over-view">
            <div>
                <ProjectRequirement projectReq={props.course.projectRequirements} />
            </div>
            <div className="separator"></div>
            <div>
                {
                    !props.isSamllScreen &&
                    <div>
                        <h1 className={`f2 overview-title ${props.isSamllScreen && 'mt-2'}`}>
                            About
                        </h1>
                        <p>
                            {props.course.description}    
                        </p>
                    </div>
                }
                <div>
                    <h1 className={`f2 overview-title ${props.isSamllScreen && 'mt-4'}`}>Attachments</h1>
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
