import React from 'react';
import Navbar from '../navbar/navbar-container';
import './course-style.css'

interface Props {
    name: string;
}

function Course(props: Props): JSX.Element {
    return (
        <>
        <Navbar />
        <div id="course">
            Course Page
        </div>
        </>
    )
}

export default Course;
