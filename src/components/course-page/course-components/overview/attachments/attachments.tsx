import { Attachment } from "../../../../../models/attachment";

type Props = {
    attachments: Array<Attachment>
}

export const Attachments = (props: Props) => {
    let attachments;

    if(props.attachments.length) {
        attachments = props.attachments.map((item) => {
            return (
                <p key={item.uid}>
                    {item.title}
                </p>
            )
        })
    }
    return (
        <div>
            { attachments ? attachments : <div> No attachments yet.</div> }
        </div>
    )
}
