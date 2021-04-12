import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BackIcon from '@material-ui/icons/ArrowBack';

import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { GetTeam } from '../../services/team-servce';

import { SystemState } from '../../store/system/types';

import { Team as TeamType } from '../../models/team';

import { GridView, Title } from '../../style';

import { ProjectFiles } from './team-style';
import { ListMembers } from '../list-members/list-members';
import { PageNavbar } from '../page-navbar/page-navbar';

type Props = {
    
};

interface Params {
    code: string;
    owner: string;
    type: string;
    title_1: string;
    title_2: string;
}

export const Team = (props: Props) => {
    const params: Params = useParams();
    const systemState: SystemState = useSelector((state: any) => state.system);

    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [team, setTeam] = useState({} as TeamType);
    const [tab, setTab] = useState(1);

    const navbarTitles = [
        'Back',
        'Overview',
        'Report',
        'Settings',
    ]

    const icons: Array<JSX.Element> = [
        <BackIcon />,
        <ImportContactsIcon />,
        <AssessmentIcon />,
        <SettingsIcon />
    ];

    const links: any = [
        `/${params.owner}/${params.code}/requirements/${params.title_1}`
    ]

    const navbarStyle = "gray";

    useEffect(() => {
        GetTeam(params.owner, params.code, params.title_1, systemState, params.title_2)
            .then((result) => {
                setTeam(result.data);
            }).catch((err) => {
                showAxiosResponseErrors(err)
                setError(true);
            }).finally(() => setFetching(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (fetching)
        return <div className="f1 text-center p-5 m-5">
            Loading....
        </div>
    
    if (error)
        return <div className="f1 text-center p-5 m-5">
            Error while loading team data....
        </div>

    return (
        <>
            <PageNavbar
                active={tab}
                icons={icons}
                setTab={setTab}
                titles={navbarTitles}
                links={links}
                styleColor={navbarStyle}
            />
            <div>
                <Container className="text-center">
                    <Title className="f1">
                        { team.name }
                    </Title>
                </Container>
            </div>
            <GridView>
                <ProjectFiles>
                    <Title className="f2 text-center pt-5">
                        NO FILES YET
                    </Title>
                </ProjectFiles>
                <div>
                    <Title className="f3">
                        Students
                    </Title>
                    <hr/>
                    <ListMembers members={team.students} />
                </div>
            </GridView>
        </>
    );
};
