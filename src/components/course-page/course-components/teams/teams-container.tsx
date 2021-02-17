import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { CourseState } from '../../../../store/course/types';

import { RequirementForTeams as Requirement } from '../../../../models/requirement';

import { GetCourseTeams } from '../../../../services/course-service';

import { Teams as View } from './teams-view';

export const Teams = () => {
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [projectRequirements, setProjectRequirements] = useState(Array<Requirement>());
    // const [filterdStudents, setFilterdTeams] = useState(Array<team>());
    // const [searchValue, setSearchValue] = useState('');

    const courseState: CourseState = useSelector((state: any) => state.course);

    useEffect(() => {
        GetCourseTeams(courseState.owner, courseState.code)
        .then((result) => {
            setProjectRequirements(result.data.teams);
        }).catch((err) => {
            setError(true);
            console.log(err);
        }).finally(() => {
            setFetching(false);
        });
    }, [courseState.owner, courseState.code])


    if (fetching) {
        return <div> Loading </div>
    } else if (error) {
        return <div> error </div>
    } else {
        const Teams = projectRequirements.map((pr: Requirement, index: number) => 
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
