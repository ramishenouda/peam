import React, { Component } from 'react';

import projectReq from '../../models/project-requirement';

import View from './project-requirement-view';

type Props = {
    projectReq: Array<projectReq>
};

class ProjectRequirement extends Component<Props> {
    render() {
        return (
            <View projectReq={this.props.projectReq} />
        );
    }
}

export default ProjectRequirement;
