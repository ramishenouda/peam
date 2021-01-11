import { Container,  Navbar } from 'react-bootstrap';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';

type Props = {
    active: number,
    tabHandler: (tab: number) => void,
}

export default function CourseNavbar(props: Props): JSX.Element {
    return (
        <Container id="course-nav">
            <Navbar>
                <span onClick={() => props.tabHandler(0)}
                  className={`course-nav-item ${props.active === 0 && 'active-tab'}`}>
                    <ImportContactsIcon /> Overview
                </span>
                <span onClick={() => props.tabHandler(1)}
                  className={`course-nav-item ${props.active === 1 && 'active-tab'} ml-5`}>
                    <PeopleIcon /> Students
                </span>
                <span onClick={() => props.tabHandler(2)} 
                   className={`course-nav-item ${props.active === 2 && 'active-tab'} ml-5`}>
                    <GroupWorkIcon /> Teams
                </span>
                <span onClick={() => props.tabHandler(3)}
                  className={`course-nav-item ${props.active === 3 && 'active-tab'} ml-5`}>
                    <AssessmentIcon /> Reports 
                </span>
                <span onClick={() => props.tabHandler(4)}
                  className={`course-nav-item ${props.active === 4 && 'active-tab'} ml-5`}>
                    <SettingsIcon /> Settings
                </span>
            </Navbar>
        </Container>
    )
}