import React, { Component } from 'react';

import projectReq from '../../models/project-requirement';
import { ProjectRequirementItem } from './project-requirement-item';

import View from './project-requirement-view';

type Props = {
    projectReq: Array<projectReq>
};

class ProjectRequirement extends Component<Props> {
    projectReqs = this.props.projectReq.map(pr => 
        <ProjectRequirementItem key={pr.uid} teacher={true} projectReq={pr} />
    );

    render() {
        return (
            <View projectReqs={this.projectReqs} />
        );
    }
}

export default ProjectRequirement;
