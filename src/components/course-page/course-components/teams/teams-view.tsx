// import { useSelector } from 'react-redux';

// import { CourseState } from '../../../../store/course/types';
import { useState, useEffect } from 'react';
import { TeamItem } from './team-item';

import { TeamForCourseList as team } from '../../../../models/team';

import { TeamsContainer, ProjectRequirementTitle, CrossLine } from './teams-style';

type Props = {
    title: string;
    teams: Array<team>;
    role: string;
    index: number;
    hideSeparator?: boolean;
}

export const Teams = (props: Props) => {
    // const courseState: CourseStateate = useSelector((state: any) => state.course);
    const [showTeams, setShowTeams] = useState(props.index === 0);
    const [teams, setTeams] = useState(Array<team>());

    const removeTeam = (name: string) => {
        const newTeams = teams.filter(x => x.name === name); 
        setTeams(newTeams);
    }

    useEffect(() => {
        setTeams(props.teams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const data = teams.map(team => {
        return <TeamItem
            students={team.students}
            name={team.name}
            key={team.uid}
            role={props.role}
            reqTitle={props.title}
            removeTeam={removeTeam}
        />
    })

    const showData = showTeams && data.length;

    return (
        <div className="mt-4">
            {
                !props.hideSeparator &&
                <ProjectRequirementTitle onClick={() => setShowTeams(!showTeams)} className="f2 mt-5">
                    <span className="f1 link">{props.title}</span>
                    <CrossLine></CrossLine>
                </ProjectRequirementTitle>
            }
            <div className="my-1">&nbsp;</div>
            {
                showData ?
                <TeamsContainer className="mt-3">
                    { data }
                </TeamsContainer> : ''
            }
            {
                (showTeams && !data.length) &&
                <div className="text-center f1">
                    No teams yet.
                </div>
            }
        </div>
    );
}
