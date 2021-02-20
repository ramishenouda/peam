import ProfileIcon from '@material-ui/icons/Person';
import SecurityIcon from '@material-ui/icons/Security';
import CoursesIcon from '@material-ui/icons/MenuBook';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import { NavItem, Navbar } from './settings-style';

type Props = {
    active: number,
    setTab: (tab: number) => void,
}

export const SettingsNavbar = (props: Props) => {
    return (
        <Navbar className="mt-3 mb-1">
            <NavItem onClick={() => props.setTab(0)} className={`${props.active === 0 && 'highlighted-text'}`}>
                <ProfileIcon className="offset-icon"/> Profile
            </NavItem>
            <NavItem onClick={() => props.setTab(1)} className={`${props.active === 1 && 'highlighted-text'}`}>
                <SecurityIcon className="offset-icon"/> Security
            </NavItem>
            <NavItem onClick={() => props.setTab(2)} className={`${props.active === 2 && 'highlighted-text'}`}>
                <CoursesIcon className="offset-icon"/> Courses
            </NavItem>
            <NavItem onClick={() => props.setTab(3)} className={`${props.active === 3 && 'highlighted-text'}`}>
                <GroupWorkIcon className="offset-icon"/> Teams
            </NavItem>
            <NavItem className="">&nbsp;</NavItem>
        </Navbar>
    );
};
