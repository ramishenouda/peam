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
    const [teams, setTeams] = useState(Array<JSX.Element>());

    useEffect(() => {
        const getData = () => {
            return props.teams.map((team) => {
                return <TeamItem
                    students={team.students}
                    name={team.name}
                    key={team.uid}
                />
            }
            )
        }

        if (showTeams) {
            setTeams(getData());
        }
    }, [showTeams, props.teams])

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
                        teams.length ? teams : 
                        <div className="text-center f3">
                            No teams yet.
                        </div>
                    }
                </TeamsContainer>
            }
        </div>
    );
}
