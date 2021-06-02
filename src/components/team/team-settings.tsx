import React, { useState } from 'react';

import { Team } from '../../models/team';

import { VerticalGridView } from '../../style';
import { VerticalNavbar } from '../vertical-navbar/vertical-navbar';
import {
  Dangerous,
  InviteStudents,
  ManageTeam,
} from './team-settings-components/index';
import { ManageProject } from './team-settings-components/manage-project';
import { PendingInvitations } from './team-settings-components/pending-invitations';

type Props = {
  team: Team;
  setTeam: (tab: Team) => void;
};

export const TeamSettings = ({ team, setTeam }: Props) => {
  const [tab, setTab] = useState(0);

  const titles = [
    'Manage team',
    'Manage Project',
    'Invite students',
    'Pending invitations',
    'Dangerous{{Red}}',
  ];

  const verticalNavbar = (
    <VerticalNavbar active={tab} setTab={setTab} titles={titles} />
  );

  return (
    <VerticalGridView>
      {verticalNavbar}
      {tab === 0 && <ManageTeam team={team} setTeam={setTeam} />}
      {tab === 1 && team.project && <ManageProject _project={team.project} />}
      {tab === 1 && !team.project && <div>No project to manage yet.</div>}
      {tab === 2 && <InviteStudents team_uuid={team.uid ? team.uid : ''} />}
      {tab === 3 && <PendingInvitations />}
      {tab === 4 && <Dangerous />}
    </VerticalGridView>
  );
};
