import { Container,  Navbar } from 'react-bootstrap';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';

type Props = {
    active: number,
    tabHandler: (tab: number) => void,
    courseDescription: string
}

export default function CourseNavbar(props: Props): JSX.Element {
    return (
        <Container id="course-nav">
            <p className="course-description">
                { props.courseDescription }
            </p>
            <Navbar>
                <span onClick={() => props.tabHandler(0)} className={`course-nav-item ${props.active === 0 && 'active-tab'}`}>
                    <ImportContactsIcon className="material-ui-icon"/> Overview
                </span>
                <span onClick={() => props.tabHandler(1)} className={`course-nav-item ${props.active === 1 && 'active-tab'} ml-5`}>
                    <PeopleIcon className="material-ui-icon"/> Students
                </span>
                <span onClick={() => props.tabHandler(2)} className={`course-nav-item ${props.active === 2 && 'active-tab'} ml-5`}>
                    <GroupWorkIcon className="material-ui-icon"/> Teams
                </span>
                <span onClick={() => props.tabHandler(3)} className={`course-nav-item ${props.active === 3 && 'active-tab'} ml-5`}>
                    <AssessmentIcon className="material-ui-icon"/> Reports 
                </span>
                <span onClick={() => props.tabHandler(4)} className={`course-nav-item ${props.active === 4 && 'active-tab'} ml-5 mr-4`}>
                    <SettingsIcon className="material-ui-icon"/> Settings
                </span>
                <span className="">&nbsp;</span>
            </Navbar>
        </Container>
    )
}