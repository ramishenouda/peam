import React, { useState } from 'react';

import { SettingsNavbar } from './settings-navbar';
import { Profile, Security } from './components/';
import { Container } from './settings-style';

interface Props {
    options: {};
}

export const SettingsView = (props: Props) => {
    const [tab, setTab] = useState(0);

    return (
        <Container className="text-center">
            <SettingsNavbar active={tab} setTab={setTab} />
            {
                tab === 0 &&
                <Profile options={props.options} />
            }
            {
                tab === 1 &&
                <Security options={props.options} />
            }
        </Container>
    )
}
