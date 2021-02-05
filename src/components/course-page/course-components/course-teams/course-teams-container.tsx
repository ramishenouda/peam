import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { CourseState } from '../../../../store/course/types';

import { TeamForCourseList as team } from '../../../../models/team';
import { GetCourseTeams } from '../../../../services/course-service';

import View from './course-teams-view';

function CourseTeams() {
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [teams, setTeams] = useState(Array<team>());
    // const [filterdStudents, setFilterdTeams] = useState(Array<team>());
    // const [searchValue, setSearchValue] = useState('');

    const courseState: CourseState = useSelector((state: any) => state.course);

    useEffect(() => {
        GetCourseTeams(courseState.courseOwner, courseState.courseTitle)
        .then((result) => {
            setTeams(result.data.teams);
        }).catch((err) => {
            setError(true);
            console.log(err);
        }).finally(() => {
            setFetching(false);
        });
    })

    if (fetching) {
        return <div> Loading </div>
    } else if (error) {
        return <div> error </div>
    } else {
        return (
            <View
                teams={teams}
                role={courseState.role} 
            />
        )
    }
}

export default CourseTeams;
