import { useState, useEffect } from 'react'

import Course from '../../models/course';

import CourseOverView from './course-components/course-overview/course-overview-container';

import './course-style.css'
import CourseNavbar from './course-navbar';

type Props = {
    course: Course;
}

export default function CourseView(props: Props): JSX.Element {
    const [tap, setTap] = useState(0);

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        console.log('subscribe to event');
        window.addEventListener('resize', () => setWindowSize(window.innerWidth));

        return function cleanup () {
            console.log('unsubscribe to events');
            window.removeEventListener('resize', () => setWindowSize(window.innerWidth));
        }
    }, []);

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
                courseDescription={props.course.description} 
                courseOwner={props.course.owner}
                active={tap} 
                tabHandler={setTap}
            />
        </header>
        <main>
            {tap === 0 &&
                <CourseOverView
                    course={props.course}
                />
            }
        </main>
        </>
    )
}
