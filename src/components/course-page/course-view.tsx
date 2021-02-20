import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { CourseState } from '../../store/course/types';

import CourseNavbar from './course-navbar';
import { OverView } from './course-components/overview/overview-container';
import { Students } from './course-components/students/students-container';
import { Teams } from './course-components/teams/teams-container';
import { Settings } from './course-components/settings/settings-container';

import './course-style.css'
import { Requirement } from '../project-requirement/requirement';

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

    const [tap, setTap] = useState(0);
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

    return (
        <>
        <header className="head bg-g-gray">
            <div className="flex-auto mb-4">
                <h1 className="course-title f2">{ courseState.title } | { courseState.code }</h1>
                { isSmallScreen &&
                    <h2 className="course-description f3">{ courseState.description }</h2>
                }
            </div>
            <CourseNavbar 
                active={tap}
                tabHandler={setTap}
                type={params.type_1}
            />
        </header>
        <main>
            {
                (tap === 0 && params.type_1 === undefined) &&
                <OverView />
            }
            {
                (tap === 1 && params.type_1 === undefined) &&
                <Students />
            }
            {
                (tap === 2 && params.type_1 === undefined) &&
                <Teams />
            }
            {
                (tap === 3 && params.type_1 === undefined) &&
                <div className="f1 mt-5 text-center">
                    Next Semester
                </div>
            }
            {
                (tap === 4 && params.type_1 === undefined) &&
                <Settings />
            }
            {
                (params.type_1 === 'requirements' && !params.type_2) &&
                <Requirement />
            }
        </main>
        </>
    )
}

export default CourseView;
