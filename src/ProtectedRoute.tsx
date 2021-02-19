import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SystemState } from './store/system/types';

type Props = {
    token?: string,
    redirectTo?: string,
    component: React.ElementType
}

// This can only work if u are authorized.
function ProtectedRoute (props: Props) {
    const systemState: SystemState = useSelector((state: any) => state.system);

    const redirectTo = props.redirectTo === undefined ? '/' : props.redirectTo;

    const Component = props.component;
    const isAuthenticated = systemState.username !== '';

    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: redirectTo }} />
    );
}

export default ProtectedRoute;
