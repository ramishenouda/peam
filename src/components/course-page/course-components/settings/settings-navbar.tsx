import React from 'react';
import { useSelector } from 'react-redux';
import { CourseState } from '../../../../store/course/types';
import { SystemState } from '../../../../store/system/types';

import { NavItem, Navbar } from './settings-style';

type Props = {
    setTab: (arg: number) => void,
    active: number
};

export const SettingsNavbar = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

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
                Students
            </NavItem>
            <hr/>
            {
                courseState.owner === systemState.username ? (
                    <>
                        <NavItem
                            onClick={() => props.setTab(2)}
                            className={`py-2 my-2 ${props.active === 2 && 'active'}`}
                        >
                            Teachers
                        </NavItem>
                        <hr/>
                    </> 
                ) : (
                    <>
                        <div className="no-select text-muted f2 py-2 my-2">
                            Teachers
                        </div>
                        <hr/>
                    </>
                )
            }
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
