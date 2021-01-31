import React, { Component } from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import Navbar from '../../navbar/navbar-container';

import View from './add-project-requirement-view';

interface RouteInfo {
    owner: string;
    courseName: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

class AddProjectRequirement extends Component<ComponentProps> {
    componentDidMount() {
        console.log(this.props.match.params.courseName, '  ', this.props.match.params.owner);
    }

    render() {
        return (
            <>
                <Navbar />
                <View />
            </>
        );
    }
}

export default withRouter(AddProjectRequirement);
