// @flow 
import * as React from 'react';
import { Student } from '../../models/student';
import { GridView, Title } from '../../style';
import { ListMembers } from '../list-members/list-members';
import { ProjectFiles } from './team-style';
type Props = {
    students: Array<Student>
};

export const TeamOverView = (props: Props) => {
    return (
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
                <ListMembers members={props.students} />
            </div>
        </GridView>
    );
};
