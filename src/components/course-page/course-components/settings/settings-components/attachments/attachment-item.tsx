import React from 'react';

import { Attachment } from '../../../../../../models/attachment';

type Props = {
    data: Attachment
};
export const AttachmentItem = (props: Props) => {
    return (
        <div className="peam-title-1">
            { props.data.title }
        </div>
    );
};