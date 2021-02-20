import React, { useEffect, useState } from 'react';

import { ProfileNavbar } from './profile-navbar';
import { Profile, Security } from './components/';

import { Container } from './profile-style';

interface Props {
}

export const ProfileView = (props: Props) => {
    const [tab, setTab] = useState(0);

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', setSize);
    
        return function cleanup () {
          window.removeEventListener('resize', setSize);
        }
    }, []);

    const mdscreen = windowSize < 801;
  
    const setSize = () => {
        setWindowSize(window.innerWidth)
    }

    return (
        <Container className="px-0" fluid mdscreen={mdscreen ? 1 : 0}>
            <ProfileNavbar active={tab} setTab={setTab} />
            {
                tab === 0 &&
                <Profile />
            }
            {
                tab === 1 &&
                <Security />
            }
        </Container>
    )
}
