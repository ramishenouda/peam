import { useState, useEffect } from 'react'

import Course from '../../models/course';

import CourseOverView from './course-components/course-overview/course-overview-container';
import CourseStudents from './course-components/course-students/course-students-container';
import CourseTeams from './course-components/course-teams/course-teams-container';

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
                <CourseOverView course={props.course} />
            }
            {tap === 1 &&
                <CourseStudents />
            }
            {
                tap === 2 &&
                <CourseTeams />
            }
            {
                tap === 3 &&
                <div className="f1 mt-5 text-center">
                    Next Semester
                </div>
            }
        </main>
        </>
    )
}

export default CourseView;
