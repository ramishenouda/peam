import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import { CourseState } from 'store/course/types';
import { SystemState } from 'store/system/types';
import { showAxiosResponseErrors } from 'services/error-handler-service';
import { PendingInvitationItem } from 'components/float-card/float-card';
import { useParams } from 'react-router-dom';
import {
  DeleteTeamInvitation,
  getTeamInvitationsList,
} from 'services/team-servce';

type Props = {};

interface Invitation {
  sender: string;
  created_at: Date;
  expiry_date: Date;
  status: string;
  type: string;
  email: string;
  token: string;
}

interface Params {
  code: string;
  owner: string;
  type: string;
  title_1: string;
  title_2: string;
}

export const PendingInvitations = (props: Props) => {
  const params: Params = useParams();

  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [invitations_data, setInvitations] = useState(Array<Invitation>());

  const removeInvitation = (token: string) => {
    setInvitations((prevState) =>
      prevState.filter((item) => item.token !== token)
    );
  };

  useEffect(() => {
    getTeamInvitationsList(
      courseState.owner,
      courseState.code,
      params.title_1,
      params.title_2,
      systemState
    )
      .then((result: AxiosResponse) => {
        setInvitations(result.data.invitations);
      })
      .catch((err: AxiosError) => {
        showAxiosResponseErrors(err);
        setError(true);
      })
      .finally(() => setFetching(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (fetching) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error...try reloading...</div>;
  }

  const invitations = invitations_data.map((item, index) => (
    <PendingInvitationItem
      key={item.token}
      invitation={item}
      courseCode={courseState.code}
      courseOwner={courseState.owner}
      token={systemState.token}
      removeInvite={DeleteTeamInvitation}
      removeInvitation={removeInvitation}
    />
  ));

  return (
    <div>
      {invitations.length > 0 && invitations}
      {!invitations.length && (
        <div className="mt-5 text-center f1">No pending invitations</div>
      )}
    </div>
  );
};
