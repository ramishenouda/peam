import React, { useEffect, useState } from 'react';
import { ProfileNavbar } from './profile-navbar';

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
        <Container fluid mdscreen={mdscreen ? 1 : 0} className="bg-g-gray">
            <ProfileNavbar active={tab} setTab={setTab} />
        </Container>
    )
}
