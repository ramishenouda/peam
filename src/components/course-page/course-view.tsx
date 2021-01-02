import Navbar from '../navbar/navbar-container';
import './course-style.css'

interface Props {
    name: string;
}

function CourseView(props: Props): JSX.Element {
    return (
        <>
        <Navbar />
        <div id="course">
            Course
        </div>
        </>
    )
}

export default CourseView;
