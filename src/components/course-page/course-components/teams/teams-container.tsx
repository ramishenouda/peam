import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { CourseState } from '../../../../store/course/types';
import { SystemState } from '../../../../store/system/types';

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
    const systemState: SystemState = useSelector((state: any) => state.system);

    useEffect(() => {
        GetCourseTeams(courseState.owner, courseState.code, systemState)
        .then((result) => {
            setProjectRequirements(result.data.teams);
        }).catch((err) => {
            setError(true);
            console.log(err);
        }).finally(() => {
            setFetching(false);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
