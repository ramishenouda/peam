import React from 'react';
import { useEffect, useState } from 'react';


import { Requirement } from '../../models/requirement';

import { RequirementNavbar } from './requirement-navbar';

import { Title, Description } from './requirement-style';

interface Params {
    owner: string;
    code: string;
    type: string;
    title_1: string;
}

type Props = {
    requirement: Requirement;
    params: Params;
};

export const RequirementView = (props: Props) => {
    const [tap, setTap] = useState(0);
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', setSize);

        return function cleanup () {
            window.removeEventListener('resize', setSize);
        }
    }, []);

    const setSize = () => {
        setWindowSize(window.innerWidth)
    }

    const isSmallScreen = windowSize < 769;

    return (
        <div className="head bg-g-gray">
            <div className="flex-auto">
                <Title className="course-title text-center link f1"> { props.requirement.title } </Title>
                { isSmallScreen &&
                    <Description className="course-description f3">{ props.requirement.description }</Description>
                }
            </div>
            <div>
                <RequirementNavbar
                    active={tap}
                    tabHandler={setTap} 
                    />
            </div>
        </div>
    );
};
