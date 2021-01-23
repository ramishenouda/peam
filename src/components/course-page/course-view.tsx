import { Container } from 'react-bootstrap';

import Course from '../../models/course';

import CourseOverView from './course-components/course-overview/course-overview-container';

import './course-style.css'
import CourseNavbar from './course-navbar';

type Props = {
    course: Course;
    activeTab: number;
    tabHandler: (tab: number) => void;
}

export default function CourseView(props: Props): JSX.Element {
    return (
        <>
        <div className="head bg-g-gray">
            <div className="flex-auto mb-4">
                <h1 className="title f2">{ props.course?.title } | { props.course?.code }</h1>
            </div>
            <CourseNavbar 
                courseDescription={props.course.description} 
                active={props.activeTab} 
                tabHandler={props.tabHandler} 
            />
        </div>
        <Container>
            {props.activeTab === 0 && (
                <CourseOverView
                    course={props.course}
                />
            )}
        </Container>
        </>
    )
}
