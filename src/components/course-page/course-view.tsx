import './course-style.css'

import Course from '../../models/course';
import CourseNavbar from './course-navbar';

type Props = {
    name?: string;
    course?: Course;
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
            <CourseNavbar active={props.activeTab} tabHandler={props.tabHandler} />
        </div>
        </>
    )
}
