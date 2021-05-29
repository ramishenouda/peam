// @flow
import { Tree } from 'components/project/tree';
import { Project as ProjectType } from 'models';
import { Student } from '../../models/student';
import { GridView, Title } from 'style';

import { ListMembers } from '../list-members/list-members';
import { Project } from '../project/project-upload';

type Props = {
  students: Array<Student>;
  project?: ProjectType;
};

export const TeamOverView = (props: Props) => {
  const isSmallScreen = window.innerWidth < 769;

  return (
    <GridView>
      {!props.project && <Project project={props.project} />}
      {props.project && <Tree project={props.project} />}
      {/* todo: make it more responsive */}
      {/* todo check if the description is not empty */}
      <div>
        {!isSmallScreen && props.project && (
          <div>
            <h1 className={`f3 overview-title ${isSmallScreen && 'mt-2'}`}>
              About
            </h1>
            <p className="overview-description peam-title-1 mt-2">
              {props.project.description}
            </p>
          </div>
        )}
        <div className="">
          <Title className="f3">Students</Title>
          <hr />
          <ListMembers members={props.students} />
        </div>
      </div>
    </GridView>
  );
};
