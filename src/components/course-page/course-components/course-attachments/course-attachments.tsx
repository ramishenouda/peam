import React, { useState } from "react"

import Attachment from "../../../../models/attachment"

type Props = {
    attachments: Array<Attachment>
}

export const CourseAttachments = (props: Props) => {
    let attachments;

    if(props.attachments.length) {
        attachments = props.attachments.map((item) => {
            return (
                <p>
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
