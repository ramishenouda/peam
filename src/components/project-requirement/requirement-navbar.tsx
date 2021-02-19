import { Navbar } from 'react-bootstrap';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

type Props = {
    active: number,
    tabHandler: (tab: number) => void,
}

export const RequirementNavbar = (props: Props) => {
    return (
        <Navbar className="course-navbar">
            <span onClick={() => props.tabHandler(0)} className={`course-nav-item ${props.active === 0 && 'active-tab'}`}>
                <ImportContactsIcon className="material-ui-icon"/> Overview
            </span>
            <span onClick={() => props.tabHandler(1)} className={`course-nav-item ${props.active === 1 && 'active-tab'} ml-5`}>
                <PeopleIcon className="material-ui-icon"/> Students
            </span>
            <span onClick={() => props.tabHandler(2)} className={`course-nav-item ${props.active === 2 && 'active-tab'} ml-5`}>
                <GroupWorkIcon className="material-ui-icon"/> Teams
            </span>
            <span className="">&nbsp;</span>
        </Navbar>
    );
};
