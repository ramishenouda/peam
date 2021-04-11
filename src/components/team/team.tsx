import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Button, Container } from 'react-bootstrap';

import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { GetTeam } from '../../services/team-servce';

import { SystemState } from '../../store/system/types';

import { Team as TeamType } from '../../models/team';

import { GridView, Title } from '../../style';

import { ProjectFiles } from './team-style';
import { ListMembers } from '../list-members/list-members';

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

    return (
        <div>
            <div>
                <Container className="text-center">
                    <Link to={`/${params.owner}/${params.code}/requirements/${params.title_1}`} className="link float-left">
                        <Button variant="outline-dark">
                            Go Back
                        </Button>
                    </Link>
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
        </div>
    );
};
