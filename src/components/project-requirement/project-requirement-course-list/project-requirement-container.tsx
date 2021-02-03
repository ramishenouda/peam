import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import projectReq from '../../../models/project-requirement';
import { ProjectRequirementItem } from './project-requirement-item';

import View from './project-requirement-view';

type Props = {
    projectReq: Array<projectReq>;
    courseOwner: string;
    courseTitle: string;
};

interface IState {
    token: string;
    redirect: string;
}

class ProjectRequirement extends Component<Props, IState> {
    state = {
        token: "",
        redirect: ""
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token === undefined)
            this.setState({redirect: '/login'})
    }

    render() {
        if(this.state.redirect)
            <Redirect to={{ pathname: this.state.redirect }} />
        
        const projectReqs = this.props.projectReq.map((pr, index) =>
            <div key={pr.uid} className={index !== this.props.projectReq.length -1 ? 'mb-3' : 'mb-1'}>
                <ProjectRequirementItem teacher={true} projectReq={pr} />
            </div> 
        );
        return (
            <View 
                courseOwner={this.props.courseOwner}
                courseTitle={this.props.courseTitle}
                projectReqs={projectReqs} 
            />
        );
    }
}

export default ProjectRequirement;
