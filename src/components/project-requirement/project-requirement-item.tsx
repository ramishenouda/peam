import { Button } from 'react-bootstrap';
import { date } from 'yup/lib/locale';
import ProjectRequirement from '../../models/project-requirement';

type Props = {
    projectReq: ProjectRequirement
    teacher: boolean | false
};

export const ProjectRequirementItem = (props: Props) => {
    const endDate = new Date(props.projectReq.to_dt);
    let showHours = false;
    let dayEarlierDate = new Date(endDate);
    dayEarlierDate.setHours(dayEarlierDate.getHours() + 24);
    if (dayEarlierDate < new Date())
        showHours = true;

    return (
        <div className="project-req-item text-light">
            <h1 className="project-req-title f1">
                { props.projectReq.title }
            </h1>
            <p className="project-req-description f3">
                { props.projectReq.description }
            </p>
            <span className={`project-req-deadline`}>
                {showHours && endDate.toLocaleTimeString()}
                {!showHours && endDate.toLocaleDateString()}
            </span>
            <div className="more-info">
            <Button variant="dark">More info</Button>
                { props.teacher && (
                    <Button className="ml-2" variant="danger">Edit info</Button>
                )}
            </div>
        </div>
    );
};
