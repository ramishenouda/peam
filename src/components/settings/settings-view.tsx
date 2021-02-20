import React, { useState } from 'react';

import { SettingsNavbar } from './settings-navbar';
import { Profile, Security } from './components/';
import { Container } from './settings-style';
import { User } from '../../models/user';

interface Props {
    user: User;
}

export const SettingsView = (props: Props) => {
    const [tab, setTab] = useState(0);

    return (
        <Container className="text-center">
            <SettingsNavbar active={tab} setTab={setTab} />
            {
                tab === 0 &&
                <Profile user={props.user} />
            }
            {
                tab === 1 &&
                <Security />
            }
        </Container>
    )
}
