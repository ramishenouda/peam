import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import projectReq from '../../../models/project-requirement';

import View from './project-requirement-view';

type Props = {
    projectReqs: Array<projectReq>;
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

        return (
            <View 
                courseOwner={this.props.courseOwner}
                courseTitle={this.props.courseTitle}
                projectReqs={this.props.projectReqs} 
            />
        );
    }
}

export default ProjectRequirement;
