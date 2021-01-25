import { useState } from 'react'

import Course from '../../models/course';

import CourseOverView from './course-components/course-overview/course-overview-container';

import './course-style.css'
import CourseNavbar from './course-navbar';

type Props = {
    course: Course;
}

export default function CourseView(props: Props): JSX.Element {
    const [tap, setTap] = useState(0);
    return (
        <>
        <header className="head bg-g-gray">
            <div className="flex-auto mb-4">
                <h1 className="title f2">{ props.course?.title } | { props.course?.code }</h1>
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
