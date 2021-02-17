import React, { useEffect, useState } from 'react';


import { CourseInfo } from './settings-components/course-info';
import { Students } from './settings-components/students';
import { Teachers } from './settings-components/teachers';
import { Attachments } from './settings-components/attachments/attachments';
import { Container } from './settings-style';
import { SettingsNavbar } from './settings-navbar';

type Props = {

};

export const SettingsView = (props: Props) => {
    const [tab, setTab] = useState(0);

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
      window.addEventListener('resize', setSize);
  
      return function cleanup () {
        window.removeEventListener('resize', setSize);
      }
    }, []);

    const mdScreen = windowSize < 768;
  
    const setSize = () => {
      setWindowSize(window.innerWidth)
    }

    return (
        <Container mdScreen={mdScreen} className="my-4">
            <SettingsNavbar active={tab} setTab={setTab} />
            {mdScreen && <br/>}
            {
                tab === 0 &&
                <CourseInfo />
            }
            {
                tab === 1 &&
                <Students />
            }
            {
                tab === 2 &&
                <Teachers />
            }
            {
                tab === 3 &&
                <Attachments />
            }
        </Container>
    );
};
