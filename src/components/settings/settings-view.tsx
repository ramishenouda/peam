import React, { useEffect, useState } from 'react';

import { SettingsNavbar } from './settings-navbar';
import { Profile, Security, Courses, Teams } from './components/';
import { Container } from './settings-style';
import { useParams } from 'react-router-dom';

interface Props {
    tab: number;
    options: {};
}

export const SettingsView = (props: Props) => {
    const [tab, setTab] = useState(0);

    useEffect(() => {
        setTab(props.tab)
    }, [props.tab])

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
            {
                tab === 2 &&
                <Courses options={props.options} />
            }
            {
                tab === 3 &&
                <Teams options={props.options} />
            }
        </Container>
    )
}
