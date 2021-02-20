import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SettingsIcon from '@material-ui/icons/Settings';

import { Navbar } from './requirement-style';

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
                <SettingsIcon className="material-ui-icon"/> Settings
            </span>
            <span className="">&nbsp;</span>
        </Navbar>
    );
};
