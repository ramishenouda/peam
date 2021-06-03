import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InviteToTeam } from 'services/team-servce';

import { CourseState } from '../../../store/course/types';
import { SystemState } from '../../../store/system/types';

import { InviteBox } from '../../invite-box/invite-box';

interface Params {
  code: string;
  owner: string;
  type: string;
  title_1: string;
  title_2: string;
}

type Props = { team_uuid: string };

export const InviteStudents = (props: Props) => {
  const params: Params = useParams();

  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);

  const date = new Date(new Date().setDate(new Date().getDate() + 7));

  const payloadArgs = {
    expiry_date: date,
    team: props.team_uuid,
  };

  const inviteFunctionArgs = [
    courseState.owner,
    courseState.code,
    params.title_1,
    params.title_2,
    systemState,
  ];

  return (
    <div>
      <InviteBox
        inviteFunction={InviteToTeam}
        title={'Invite students'}
        payloadArgs={payloadArgs}
        inviteFunctionArgs={inviteFunctionArgs}
        errorText="Make sure all of the students are in the course."
      />
    </div>
  );
};
