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

    // const payloadArgs = {
    //     team: courseState.team.
    // }

    return (
        <div>
            {/* <InviteBox
                inviteFunction={invite}
                title={'Invite students'}
            /> */}
        </div>
    );
};