import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';

import { CourseState } from '../../store/course/types';

import { OverView } from './course-components/overview/overview-container';
import { Students } from './course-components/students/students-container';
import { Teams } from './course-components/teams/teams-container';
import { Settings } from './course-components/settings/settings-container';

import './course-style.css';
import { Requirement } from '../project-requirement/requirement';
import { Team } from '../team/team';
import { PageNavbar } from '../page-navbar/page-navbar';

type Props = {};

interface Params {
  code: string;
  owner: string;
  type_1: string;
  type_2: string;
  title_1: string;
  title_2: string;
}

const CourseView = (props: Props): JSX.Element => {
  const params: Params = useParams();
  const courseState: CourseState = useSelector((state: any) => state.course);

  const [tab, setTab] = useState(0);
  const [title, setTitle] = useState(
    params.title_1 ? params.title_1 : courseState.title
  );
  const [titleLink, SetTitleLink] = useState(
    `/${courseState.owner}/${courseState.code}`
  );

  const tabsTitles = ['Overview', 'Students', 'Teams', 'Reports', 'Settings'];
  useEffect(() => {
    setTitle(params.title_1 ? params.title_1 : courseState.title);
  }, [params, tab, courseState.title]);

  const links = [
    `/${courseState.owner}/${courseState.code}`,
    `/${courseState.owner}/${courseState.code}`,
    `/${courseState.owner}/${courseState.code}`,
    `/${courseState.owner}/${courseState.code}`,
    `/${courseState.owner}/${courseState.code}`,
  ];

  const isTeacher = courseState.role === 'teacher';
  const conditions = [true, true, true, isTeacher, isTeacher];

  const icons: Array<JSX.Element> = [
    <ImportContactsIcon />,
    <PeopleIcon />,
    <GroupWorkIcon />,
    <AssessmentIcon />,
    <SettingsIcon />,
  ];

  return (
    <>
      {!params.type_2 && (
        <PageNavbar
          titles={tabsTitles}
          icons={icons}
          setTab={setTab}
          type={params.type_1}
          conditions={conditions}
          active={tab}
          links={links}
          showHeader={true}
          title={title}
          titleLink={titleLink}
          subTitle={courseState.code}
          description={courseState.description}
        />
      )}
      <main>
        {tab === 0 && params.type_1 === undefined && <OverView />}
        {tab === 1 && params.type_1 === undefined && <Students />}
        {tab === 2 && params.type_1 === undefined && <Teams fetch={true} />}
        {tab === 3 && params.type_1 === undefined && (
          <div className="f1 mt-5 text-center">Next Semester</div>
        )}
        {tab === 4 &&
          params.type_1 === undefined &&
          courseState.role === 'teacher' && <Settings />}
        {params.type_1 === 'requirements' && !params.type_2 && <Requirement />}
        {params.type_1 === 'requirements' && params.type_2 === 'teams' && (
          <Team />
        )}
      </main>
    </>
  );
};

export default CourseView;
