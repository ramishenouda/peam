// @flow
import { Tree } from 'components/project/tree';
import { Project as ProjectType } from 'models';
import { Student } from '../../models/student';
import { GridView, Title } from '../../style';

import { ListMembers } from '../list-members/list-members';
import { Project } from '../project/project-upload';

type Props = {
  students: Array<Student>;
  project?: ProjectType;
};

export const TeamOverView = (props: Props) => {
  return (
    <GridView>
      {!props.project && <Project project={props.project} />}
      {props.project && <Tree project={props.project} />}
      {/* make it more responsive */}
      <div className="">
        <Title className="f3">Students</Title>
        <hr />
        <ListMembers members={props.students} />
      </div>
    </GridView>
  );
};
