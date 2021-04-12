import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';

import { CourseState } from '../../store/course/types';

import { OverView } from './course-components/overview/overview-container';
import { Students } from './course-components/students/students-container';
import { Teams } from './course-components/teams/teams-container';
import { Settings } from './course-components/settings/settings-container';

import './course-style.css'
import { Requirement } from '../project-requirement/requirement';
import { Team } from '../team/team';
import { PageNavbar } from '../page-navbar/page-navbar';

type Props = {
}

interface Params {
    code: string;
    owner: string;
    type_1: string;
    type_2: string;
    title_1: string;
    title_2: string;
}

const CourseView = (props: Props): JSX.Element => {
    const courseState: CourseState = useSelector((state: any) => state.course);

    const [tab, setTab] = useState(0);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const params: Params = useParams();

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
    const tabsTitles = ['Overview', 'Students', 'Teams', 'Reports', 'Settings'];
    const links = [
        `/${courseState.owner}/${courseState.code}`,
        `/${courseState.owner}/${courseState.code}`,
        `/${courseState.owner}/${courseState.code}`,
        `/${courseState.owner}/${courseState.code}`,
        `/${courseState.owner}/${courseState.code}`
    ];

    const icons: Array<JSX.Element> = [
        <ImportContactsIcon />,
        <PeopleIcon />,
        <GroupWorkIcon />,
        <AssessmentIcon />,
        <SettingsIcon />
    ];

    return (
        <>
        <header className="head bg-g-gray">
            <div className="flex-auto pb-4">
                <h1 className="course-title f2">
                    <Link className="disable-link-style" to={`/${courseState.owner}/${courseState.code}`}>
                        { courseState.title } | { courseState.code }
                    </Link>
                </h1>
                { isSmallScreen &&
                    <h2 className="course-description f3">{ courseState.description }</h2>
                }
            </div>
            {
                !params.type_2 &&
                <PageNavbar
                    titles={tabsTitles}
                    icons={icons}
                    setTab={setTab}
                    type={params.type_1}
                    active={tab}
                    links={links}
                />
            }
        </header>
        <main>
            {
                (tab === 0 && params.type_1 === undefined) &&
                <OverView />
            }
            {
                (tab === 1 && params.type_1 === undefined) &&
                <Students />
            }
            {
                (tab === 2 && params.type_1 === undefined) &&
                <Teams fetch={true} />
            }
            {
                (tab === 3 && params.type_1 === undefined) &&
                <div className="f1 mt-5 text-center">
                    Next Semester
                </div>
            }
            {
                (tab === 4 && params.type_1 === undefined) &&
                <Settings />
            }
            {
                (params.type_1 === 'requirements' && !params.type_2) &&
                <Requirement />
            }
            {
                (params.type_1 === 'requirements' && params.type_2 === 'teams') &&
                <Team />
            }
        </main>
        </>
    )
}

export default CourseView;
