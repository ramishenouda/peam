import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProjectRequirement } from '../../../../../../models/project-requirement';

import View from './add-project-requirement-view';

interface RouteInfo {
    owner: string;
    courseName: string;
}

interface IState {
    status: boolean;
    redirectURL: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

class AddProjectRequirement extends Component<ComponentProps, IState> {
    state = {
        status: false,
        redirectURL: '/' + this.props.match.params.owner + '/' + this.props.match.params.courseName
    }

    componentDidMount() {
        console.log(this.props.match.params.courseName, '  ', this.props.match.params.owner);
    }

    add = (pr: ProjectRequirement) => {
        console.log(pr);
        // calling the akandil's server hehehe
        this.setState({status: true})

        if (this.state.status) {
            console.log('all is good, show some loading and bla bla')
        }
    }

    render() {
        if (this.state.status) {
            return <Redirect to={{ pathname: this.state.redirectURL }} />
        }

        return (
            <>
                <View add={this.add} />
            </>
        );
    }
}

export default withRouter(AddProjectRequirement);
