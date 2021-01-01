import React from 'react'
import { Redirect } from 'react-router-dom'

type Props = {
    token?: string,
    redirectTo?: string,
    component: React.ElementType
}

// This can only work if u are unauthorized.
class AnonymousRoute extends React.Component<Props> {
    render() {
        const token = this.props.token === undefined ? 'token' : this.props.token;
        const redirectTo = this.props.redirectTo === undefined ? '/' : this.props.redirectTo;

        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem(token);

        return isAuthenticated === null ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: redirectTo }} />
        );
    }
}

export default AnonymousRoute;
