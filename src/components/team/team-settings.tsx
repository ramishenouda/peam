import React, { useState } from 'react';

import { Team } from '../../models/team';

import { VerticalGridView } from '../../style';
import { VerticalNavbar } from '../vertical-navbar/vertical-navbar';
import { Dangerous, InviteStudents, ManageTeam } from './team-settings-components/index';

type Props = {
    team: Team;
    setTeam: (tab: Team) => void;
};

export const TeamSettings = (props: Props) => {

    const [tab, setTab] = useState(0);

    const titles = [
        'Manage team',
        'Invite students',
        'Dangerous{{Red}}'
    ]

    const verticalNavbar = <VerticalNavbar active={tab} setTab={setTab} titles={titles} />

    return (
        <VerticalGridView>
            { verticalNavbar }
            {
                tab === 0 &&
                <ManageTeam team={props.team} setTeam={props.setTeam}/>
            }
            {
                tab === 1 &&
                <InviteStudents />
            }
            {
                tab === 2 &&
                <Dangerous />
            }
        </VerticalGridView>
    );
};