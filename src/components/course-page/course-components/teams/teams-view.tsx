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

    return (
        <div className="mt-4">
            {
                !props.hideSeparator &&
                <ProjectRequirementTitle onClick={() => setShowTeams(!showTeams)} className="f2 mb-4">
                    <span className="f1 bg-g-gray">{props.title}</span>
                    <CrossLine></CrossLine>
                </ProjectRequirementTitle>
            }
            {
                !showTeams && 
                <div className="text-center f3">
                    Click on title to see teams.
                </div>
            }
            {
                (showTeams) &&
                <TeamsContainer className="mt-3">
                    {
                        data.length ? data : 
                        <div className="text-center f3">
                            No teams yet.
                        </div>
                    }
                </TeamsContainer>
            }
        </div>
    );
}
