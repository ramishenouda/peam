import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { CourseState } from '../../../../store/course/types';

import { ProjectRequirementForTeams as ProjectRequirement, ProjectRequirementForTeams } from '../../../../models/project-requirement';

import { GetCourseTeams } from '../../../../services/course-service';

import { Teams as View } from './teams-view';

export const Teams = () => {
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [projectRequirements, setProjectRequirements] = useState(Array<ProjectRequirement>());
    // const [filterdStudents, setFilterdTeams] = useState(Array<team>());
    // const [searchValue, setSearchValue] = useState('');

    const courseState: CourseState = useSelector((state: any) => state.course);

    useEffect(() => {
        GetCourseTeams(courseState.courseOwner, courseState.courseCode)
        .then((result) => {
            setProjectRequirements(result.data.teams);
        }).catch((err) => {
            setError(true);
            console.log(err);
        }).finally(() => {
            setFetching(false);
        });
    }, [courseState.courseOwner, courseState.courseCode])


    if (fetching) {
        return <div> Loading </div>
    } else if (error) {
        return <div> error </div>
    } else {
        const Teams = projectRequirements.map((pr: ProjectRequirementForTeams, index: number) => 
            <View
                title={pr.projectRequirement}
                teams={pr.teams}
                role={courseState.role}
                key={pr.id} 
                index={index}
            />
        );
        return (
            <>
                { Teams }
            </>
        )
    }
}
