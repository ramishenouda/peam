import React, { useEffect, useState } from 'react';


import { CourseInfo } from './settings-components/course-info';
import { Students } from './settings-components/students';
import { Teachers } from './settings-components/teachers';
import { Attachments } from './settings-components/attachments/attachments';
import { Container } from './settings-style';
import { SettingsNavbar } from './settings-navbar';
import { Requirements } from './settings-components/requirements/requirements';

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

    const mdscreen = windowSize < 801;
  
    const setSize = () => {
      setWindowSize(window.innerWidth)
    }

    return (
        <Container mdscreen={mdscreen ? 1 : 0} className="my-4">
            <SettingsNavbar active={tab} setTab={setTab} />
            {mdscreen && <br/>}
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
            {
                tab === 4 &&
                <Requirements showOptions={true} showAdd={true} />
            }
        </Container>
    );
};
