import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SystemState } from '../../store/system/types';
import { CourseState } from '../../store/course/types';


import { GetRequirement } from '../../services/requirement-service';
import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { confirmText, error as Error } from '../../services/notification-service';
import { CreateTeam } from '../../services/team-servce';

import { TeamForCreation as Team } from '../../models/team';
import { Requirement as requirement } from '../../models/requirement';

import { RequirementView } from './requirement-view';

type Props = {

};

interface Params {
    code: string;
    owner: string;
    type: string;
    title_1: string;
    title_2: string;
}

export const Requirement = (props: Props) => {
    const params: Params = useParams();
    const systemState: SystemState = useSelector((state: any) => state.system);
    const courseState: CourseState = useSelector((state: any) => state.course);

    const initialReq: requirement = {
        attachments: [],
        course: '',
        description: '',
        from_dt: new Date(),
        teams: [],
        title: '',
        to_dt: new Date(),
        uid: ''
    }

    const [requirement, setRequirement] = useState(initialReq)
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log(params);

        GetRequirement(params.owner, params.code, params.title_1, systemState)
            .then((result) => {
                setRequirement(result.data);
                console.log(result);
            }).catch((err) => {
                showAxiosResponseErrors(err)
                setError(true);
            }).finally(() => setFetching(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createTeam = () => {
        confirmText('Create team', '', 'Team name', 'Create team')
            .then(result => {
                if(!result.isConfirmed)
                    return;

                const teamName = result.value;
                if (!teamName) {
                    Error('Team name can\'t be empty or undefined');
                } else if (teamName.match(/[_\W]/)) {
                    Error('Team name can\'t contain special characters');
                }

                const team: Team = {
                    name: teamName,
                    requirement: requirement.uid
                }

                CreateTeam(courseState.owner, courseState.code, requirement.title, systemState, team)
                    .then((result) => {
                        console.log(result);
                    }).catch((err) => {
                        showAxiosResponseErrors(err)
                    });
            })
    }

    if (fetching) {
        return (
            <div className="f1 mt-5 text-center">
                Loading....
            </div>
        )
    } else if (error) {
        return (
            <div className="f1 mt-5 text-center">
                Error while loading the requirement....
            </div>
        )
    }

    return (
        <RequirementView
            requirement={requirement}
            params={params}
            createTeam={createTeam}
        />
    );
};
