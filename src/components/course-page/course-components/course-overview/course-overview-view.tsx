import Course from '../../../../models/course';
import ProjectRequirement from '../../../project-requirement/project-requirement-container';
import './course-overview-style.css';

type Props = {
    course: Course
}

function CourseOverView(props: Props) {
    return (
        <div id="course-over-view">
            <div>
                <ProjectRequirement projectReq={props.course.projectRequirements} />
            </div>
            <div className="separator"></div>
            <div>
                <h1 className="f2 title">Attachments</h1>
                <div className="mb-2">
                    <hr className="title-hr" />
                </div>
                <div>                       
                    <h5>
                        Lecture from last night
                    </h5>
                    <h5>
                        Lecture from last night
                    </h5>
                    <h5>
                        Lecture from last night
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default CourseOverView;
