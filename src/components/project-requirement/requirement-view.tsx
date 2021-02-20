import React from 'react';
import { Button } from 'react-bootstrap';


import { Requirement } from '../../models/requirement';
import { Attachments } from '../course-page/course-components/overview/attachments/attachments';
import { DDate } from '../course-page/course-components/settings/settings-components/requirements/requirement-style';
import { Teams } from '../course-page/course-components/teams/teams-container';

import { Title, Description, Container } from './requirement-style';

interface Params {
    owner: string;
    code: string;
    type: string;
    title_1: string;
}

type Props = {
    requirement: Requirement;
    params: Params;
    createTeam: () => void;
};

export const RequirementView = (props: Props) => {
    const mdScreen = window.innerWidth < 768;

    const endDate = new Date(props.requirement.to_dt);
    const startDate = new Date(props.requirement.from_dt);

    let endDateStatus = '';
    let showStartDate = true;

    const dayEarlierDate = new Date(endDate);
    
    dayEarlierDate.setHours(dayEarlierDate.getHours() - 24);
    if (dayEarlierDate < new Date())
        endDateStatus = 'ShowHours';

    if (endDate < new Date())
        endDateStatus = 'GameOver';

    if (startDate < new Date())
        showStartDate = false;

    return (
        <div className="mt-2">
            <div>
                <Title className='text-center f1'> { props.requirement.title } </Title>
            </div>
            <Container>
                <div className="mb-5">
                    <div className="text-right">
                        {
                            // courseState.role === 'student' &&
                            <Button onClick={props.createTeam} variant="outline-dark" className="f2">
                                Create team
                            </Button>
                        }
                    </div>
                    <Teams requirement={props.requirement} />
                </div>
                {
                    mdScreen &&
                    <hr />
                }
                <div>
                    <div className="mb-4">
                        <Title className="f3">
                            Deadline
                        </Title>
                        <DDate className="mb-2 f4">
                            {
                                showStartDate &&
                                <span className={`requirement-deadline`}>
                                    From: {startDate.toLocaleDateString()}
                                </span>
                            }
                            <span className={`${showStartDate ? 'pl-2' : ''}`}>
                                {
                                    showStartDate ? 'To:' : 'Today:'
                                }
                                &nbsp;
                                {!endDateStatus && endDate.toLocaleString()}
                                {endDateStatus === 'ShowHours' && endDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
                                {endDateStatus === 'GameOver' && <span className="date-over"> { endDate.toLocaleString() }</span>}
                            </span>
                        </DDate>
                    </div>
                    <div className="mb-4">
                        <Title className='f3'>
                            About
                        </Title>
                        <Description >{ props.requirement.description }</Description>
                    </div>
                    <hr />
                    <div className="mt-4">
                        <Title className='f2'>
                            Attachments
                        </Title>
                        <Attachments attachments={ props.requirement.attachments }/>
                    </div>
                </div>
            </Container>
        </div>
    );
};
