// deprecated, check page-navbar.tsx

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Navbar } from 'react-bootstrap';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';

import { CourseState } from '../../store/course/types';

type Props = {
  active: number;
  tabHandler: (tab: number) => void;
  type?: string;
};

export default function CourseNavbar(props: Props): JSX.Element {
  const courseState: CourseState = useSelector((state: any) => state.course);

  return (
    <Navbar className="course-navbar">
      <Link
        to={`/${courseState.owner}/${courseState.code}`}
        className="disable-link-style"
      >
        <span
          onClick={() => props.tabHandler(0)}
          className={`course-nav-item ${
            props.active === 0 && !props.type && 'active-tab'
          }`}
        >
          <ImportContactsIcon className="material-ui-icon" /> Overview
        </span>
      </Link>
      <Link
        to={`/${courseState.owner}/${courseState.code}`}
        className="disable-link-style"
      >
        <span
          onClick={() => props.tabHandler(1)}
          className={`course-nav-item ${
            props.active === 1 && !props.type && 'active-tab'
          } ml-5`}
        >
          <PeopleIcon className="material-ui-icon" /> Students
        </span>
      </Link>
      <Link
        to={`/${courseState.owner}/${courseState.code}`}
        className="disable-link-style"
      >
        <span
          onClick={() => props.tabHandler(2)}
          className={`course-nav-item ${
            props.active === 2 && !props.type && 'active-tab'
          } ml-5`}
        >
          <GroupWorkIcon className="material-ui-icon" /> Teams
        </span>
      </Link>
      {courseState.role === 'teacher' && (
        <Link
          to={`/${courseState.owner}/${courseState.code}`}
          className="disable-link-style"
        >
          <span
            onClick={() => props.tabHandler(3)}
            className={`course-nav-item ${
              props.active === 3 && !props.type && 'active-tab'
            } ml-5`}
          >
            <AssessmentIcon className="material-ui-icon" /> Reports
          </span>
        </Link>
      )}
      {courseState.role === 'teacher' && (
        <Link
          to={`/${courseState.owner}/${courseState.code}`}
          className="disable-link-style"
        >
          <span
            onClick={() => props.tabHandler(4)}
            className={`course-nav-item ${
              props.active === 4 && !props.type && 'active-tab'
            } ml-5 mr-4`}
          >
            <SettingsIcon className="material-ui-icon" /> Settings
          </span>
        </Link>
      )}
      <span className="">&nbsp;</span>
    </Navbar>
  );
}
