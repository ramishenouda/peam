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
                className={`py-2 my-2 ${props.active === 0 && 'active'}`}
            >
                Course
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(1)} 
                className={`py-2 my-2 ${props.active === 1 && 'active'}`}
            >
                Invite students
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(2)} 
                className={`py-2 my-2 ${props.active === 2 && 'active'}`}
            >
                Invite teachers
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(3)} 
                className={`py-2 my-2 ${props.active === 3 && 'active'}`}
            >
                Attachments
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(4)} 
                className={`py-2 my-2 ${props.active === 4 && 'active'}`}
            >
                Project Requirements
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(5)} 
                className={`py-2 my-2 ${props.active === 5 && 'active'}`}
            >
                Pending invitations
            </NavItem>
            <hr/>
            <NavItem 
                onClick={() => props.setTab(6)}
                className={`py-2 my-2 text-warning ${props.active === 6 && 'active'}`}
            >
                Dangerous
            </NavItem>
        </Navbar>
    );
};
