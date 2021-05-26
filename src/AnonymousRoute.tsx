import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { SystemState } from './store/system/types';

type Props = {
  token?: string;
  redirectTo?: string;
  component: React.ElementType;
};

interface Query {
  query: string;
}

// This can only work if u are unauthorized.
function AnonymousRoute(props: Props) {
  const systemState: SystemState = useSelector((state: any) => state.system);

  const refreshToken =
    props.token === undefined ? 'refresh_token' : props.token;
  const redirectTo = props.redirectTo === undefined ? '/' : props.redirectTo;

  const Component = props.component;
  const isAuthenticated =
    localStorage.getItem(refreshToken) && systemState.username !== '';

  const data: Query = useParams();
  const equalIndex = data.query ? data.query.indexOf('=') : 0;

  if (equalIndex) {
    const action = data.query.slice(0, equalIndex);
    const token = data.query.slice(equalIndex + 1, data.query.length);

    if (action === 'course-invitation' && isAuthenticated) {
      return <Redirect to={{ pathname: `/courses/invitations/${token}` }} />;
    } else if (action === 'team-invitation' && isAuthenticated) {
      return (
        <Redirect to={{ pathname: `/courses/teams/invitations/${token}` }} />
      );
    }
  }

  return isAuthenticated === null ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: redirectTo }} />
  );
}

export default AnonymousRoute;
