import React from 'react';

import { NavItem, Navbar } from './settings-style';

type Props = {
    setTab: (arg: number) => void,
    active: number
};

export const SettingsNavbar = (props: Props) => {
    return (
        <Navbar className="text-center">
            <NavItem
                onClick={() => props.setTab(0)}
                className={`py-2 my-2 ${props.active === 0 && 'active-tab'}`}
            >
                Course
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(1)} 
                className={`py-2 my-2 ${props.active === 1 && 'active-tab'}`}
            >
                Students
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(2)} 
                className={`py-2 my-2 ${props.active === 2 && 'active-tab'}`}
            >
                Teachers
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(3)} 
                className={`py-2 my-2 ${props.active === 3 && 'active-tab'}`}
            >
                Attachments
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(4)}
                className={`py-2 my-2 text-warning ${props.active === 4 && 'active-tab'}`}
            >
                Dangerous
            </NavItem>
        </Navbar>
    );
};
