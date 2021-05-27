import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import OverviewIcon from '@material-ui/icons/ImportContacts';
import StudentsIcon from '@material-ui/icons/People';
import TeamsIcon from '@material-ui/icons/GroupWork';
import ReportsIcon from '@material-ui/icons/Assessment';
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
import { NavItem, PageNavbar as PageNavbarType } from 'models';

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

  const titleLink: string = `/${courseState.owner}/${courseState.code}`;

  useEffect(() => {
    setTitle(params.title_1 ? params.title_1 : courseState.title);
  }, [params, tab, courseState.title]);

  const isTeacher = courseState.role === 'teacher';

  const navItems: Array<NavItem> = [
    {
      title: 'Overview',
      icon: <OverviewIcon />,
      setTab: setTab,
      tab: 0,
      active: false,
      link: titleLink,
    },
    {
      title: 'Students',
      icon: <StudentsIcon />,
      setTab: setTab,
      tab: 1,
      active: false,
      link: titleLink,
    },
    {
      title: 'Teams',
      icon: <TeamsIcon />,
      setTab: setTab,
      tab: 2,
      active: false,
      link: titleLink,
    },
    {
      title: 'Reports',
      icon: <ReportsIcon />,
      setTab: setTab,
      tab: 3,
      active: false,
      link: titleLink,
      hideCondition: !isTeacher,
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      setTab: setTab,
      tab: 4,
      active: false,
      link: titleLink,
      hideCondition: !isTeacher,
    },
  ];

  const navbar: PageNavbarType = {
    title: title,
    titleLink: titleLink,
    subTitle: courseState.code,
    description: courseState.description,
    showHeader: true,
    active: tab,
    navItems: navItems,
  };

  return (
    <>
      {!params.type_2 && <PageNavbar pageNavbar={navbar} />}
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
