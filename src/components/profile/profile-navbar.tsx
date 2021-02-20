import ProfileIcon from '@material-ui/icons/Person';
import SecurityIcon from '@material-ui/icons/Security';
import CoursesIcon from '@material-ui/icons/MenuBook';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import { NavItem, Navbar } from './profile-style';

type Props = {
    active: number,
    setTab: (tab: number) => void,
}

export const ProfileNavbar = (props: Props) => {
    return (
        <Navbar className="py-3 pl-5 bg-g-gray">
            <NavItem onClick={() => props.setTab(0)} className={`${props.active === 0 && 'highlighted-text'}`}>
                <ProfileIcon className="offset-icon"/> Profile
            </NavItem>
            <NavItem onClick={() => props.setTab(1)} className={`${props.active === 1 && 'highlighted-text'} pl-5`}>
                <SecurityIcon className="offset-icon"/> Security
            </NavItem>
            <NavItem onClick={() => props.setTab(2)} className={`${props.active === 2 && 'highlighted-text'} pl-5`}>
                <CoursesIcon className="offset-icon"/> Courses
            </NavItem>
            <NavItem onClick={() => props.setTab(3)} className={`${props.active === 3 && 'highlighted-text'} pl-5`}>
                <GroupWorkIcon className="offset-icon"/> Teams
            </NavItem>
            <NavItem className="">&nbsp;</NavItem>
        </Navbar>
    );
};
