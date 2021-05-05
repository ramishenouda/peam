import { useSelector } from "react-redux";

import { CourseState } from "../../../store/course/types";
import { SystemState } from "../../../store/system/types";

import { InviteBox } from "../../invite-box/invite-box";

type Props = {

};
export const InviteStudents = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const invite = async () => {

    }

    const date = new Date(new Date().setDate(new Date().getDate() + 7))

    const payloadArgs = {
        course: courseState.id,
        expiry_date: date,
        type: 'student'
    }

    const inviteFunctionArgs = [ courseState.owner, courseState.code, systemState ]

    return (
        <div>
            <InviteBox
                inviteFunction={invite}
                title={'Invite students'}
                payloadArgs={payloadArgs}
                inviteFunctionArgs={inviteFunctionArgs}
            />
        </div>
    );
};
