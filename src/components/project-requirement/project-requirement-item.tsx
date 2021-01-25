import ProjectRequirement from '../../models/project-requirement';

type Props = {
    projectReq: ProjectRequirement
};

export const ProjectRequirementItem = (props: Props) => {
    return (
        <div className="bg-g-dark project-req-item text-light">
            { props.projectReq.title }
        </div>
    );
};
