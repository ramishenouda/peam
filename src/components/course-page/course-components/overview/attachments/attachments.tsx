import { Attachment } from "../../../../../models/attachment";

import { AttachmentItem } from '../../settings/settings-components/attachments/attachment-item';

type Props = {
    attachments: Array<Attachment>
}

export const Attachments = (props: Props) => {
    let attachments;

    if(props.attachments.length) {
        attachments = props.attachments.map((item) => {
            return (
                <AttachmentItem key={item.uid} courseCode={item.course} courseOwner={item.course} data={item} showOptions={false} />
            )
        })
    }
    return (
        <div>
            { attachments ? attachments : <div> No attachments yet.</div> }
        </div>
    )
}
