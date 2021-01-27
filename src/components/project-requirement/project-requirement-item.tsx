import { Button } from 'react-bootstrap';
import ProjectRequirement from '../../models/project-requirement';

type Props = {
    projectReq: ProjectRequirement
    teacher: boolean | false
};

export const ProjectRequirementItem = (props: Props) => {
    return (
        <div className="project-req-item mb-2 text-light">
            <h1 className="project-req-title f1">
                { props.projectReq.title }
            </h1>
            <p className="project-req-description f3">
                { props.projectReq.description }
            </p>
            <span className="project-req-deadline">
                { props.projectReq.to_dt }
            </span>
            <div className="more-info">
            <Button variant="dark">More info</Button>
                { props.teacher && (
                    <Button className="ml-2" variant="warning">Edit info</Button>
                )}
            </div>
        </div>
    );
};
