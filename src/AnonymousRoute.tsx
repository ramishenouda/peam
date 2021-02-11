import React from 'react'
import { Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux';
import { SystemState } from './store/system/types';

type Props = {
    token?: string,
    redirectTo?: string,
    component: React.ElementType
}

// This can only work if u are unauthorized.
function AnonymousRoute (props: Props) {
    const systemState: SystemState = useSelector((state: any) => state.system);

    const refreshToken = props.token === undefined ? 'refresh_token' : props.token;
    const redirectTo = props.redirectTo === undefined ? '/' : props.redirectTo;

    const Component = props.component;
    const isAuthenticated = localStorage.getItem(refreshToken) && systemState.username !== '';

    return isAuthenticated === null ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: redirectTo }} />
    );
}

export default AnonymousRoute;
