import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BackIcon from '@material-ui/icons/ArrowBack';

import { showAxiosResponseErrors } from '../../services/error-handler-service';
import { GetTeam } from '../../services/team-servce';

import { SystemState } from '../../store/system/types';
import { CourseState } from '../../store/course/types';
import { updateTeam } from 'store/team/actions';

import { Team as TeamType } from '../../models/team';

import { PageNavbar } from '../page-navbar/page-navbar';
import { TeamOverView } from './team-overview';
import { TeamSettings } from './team-settings';
import { Report } from 'components/report';

type Props = {};

interface Params {
  code: string;
  owner: string;
  type: string;
  title_1: string;
  title_2: string;
}

export const Team = (props: Props) => {
  const params: Params = useParams();
  const dispatch = useDispatch();

  const systemState: SystemState = useSelector((state: any) => state.system);
  const courseState: CourseState = useSelector((state: any) => state.course);

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [team, setTeam] = useState({} as TeamType);
  const [tab, setTab] = useState(1);
  const [inteam, setInTeam] = useState(false);

  const titleLink = `/${courseState.owner}/${courseState.code}`;
  let navbarTitles;
  if (inteam || courseState.role === 'teacher')
    navbarTitles = ['Back', 'Overview', 'Report', 'Settings'];
  else navbarTitles = ['Back', 'Overview'];

  let icons: Array<JSX.Element>;

  if (inteam || courseState.role === 'teacher')
    icons = [
      <BackIcon />,
      <ImportContactsIcon />,
      <AssessmentIcon />,
      <SettingsIcon />,
    ];
  else icons = [<BackIcon />, <ImportContactsIcon />];
  const links: any = [
    `/${params.owner}/${params.code}/requirements/${params.title_1}`,
  ];

  const navbarStyle = 'gray';

  const pageNavbar = (
    <PageNavbar
      active={tab}
      icons={icons}
      setTab={setTab}
      titles={navbarTitles}
      links={links}
      styleColor={navbarStyle}
      showHeader={true}
      title={params.title_1}
      titleLink={titleLink}
      subTitle={team.name}
      description={team.project ? team.project.description : ''}
    />
  );

  useEffect(() => {
    GetTeam(
      params.owner,
      params.code,
      params.title_1,
      systemState,
      params.title_2
    )
      .then((result) => {
        setTeam(result.data);
        const initial: TeamType = result.data;
        dispatch(updateTeam(initial));
        let f = false;
        result.data.students.forEach((s: any) => {
          if (s.username === systemState.username) f = true;
        });

        setInTeam(f);
      })
      .catch((err) => {
        showAxiosResponseErrors(err);
        setError(true);
      })
      .finally(() => setFetching(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetching)
    return <div className="f1 text-center p-5 m-5">Loading....</div>;

  if (error)
    return (
      <div className="f1 text-center p-5 m-5">
        Error while loading team data....
      </div>
    );

  return (
    <>
      {pageNavbar}
      {tab === 1 && (
        <TeamOverView project={team.project} students={team.students} />
      )}
      {tab === 2 && <Report team={team} token={systemState.token} />}
      {tab === 3 && <TeamSettings setTeam={setTeam} team={team} />}
    </>
  );
};
