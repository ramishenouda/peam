import { useState, useEffect } from 'react'

import { Course } from '../../models/course';

import { OverView } from './course-components/overview/overview-container';
import { Students } from './course-components/students/students-container';
import { Teams } from './course-components/teams/teams-container';
import { Settings } from './course-components/settings/settings-container';

import './course-style.css'
import CourseNavbar from './course-navbar';

type Props = {
    course: Course;
}

const CourseView = (props: Props): JSX.Element => {
    const [tap, setTap] = useState(0);
    const [windowSize, setWindowSize] = useState(window.innerWidth);

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
                <h1 className="course-title f2">{ props.course.title } | { props.course.code }</h1>
                { isSmallScreen &&
                    <h2 className="course-description f3">{ props.course.description }</h2>
                }
            </div>
            <CourseNavbar 
                active={tap}
                tabHandler={setTap}
            />
        </header>
        <main>
            {tap === 0 &&
                <OverView />
            }
            {tap === 1 &&
                <Students />
            }
            {
                tap === 2 &&
                <Teams />
            }
            {
                tap === 3 &&
                <div className="f1 mt-5 text-center">
                    Next Semester
                </div>
            }
            {
                tap === 4 &&
                <Settings />
            }
        </main>
        </>
    )
}

export default CourseView;
