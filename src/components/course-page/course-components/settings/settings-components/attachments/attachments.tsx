import React from 'react';
import { useSelector } from 'react-redux';

import { CourseState } from '../../../../../../store/course/types';
import { AttachmentItem } from './attachment-item';

import { AddAttachments } from './add-attachments';

import { Section } from '../../settings-style';

type Props = {
    
};

export const Attachments = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    
    // const [attachments, setAttachments] = useState(Array<Attachment>())
    // useEffect(() => {
    //     GetCourseAttachments(courseState.courseOwner, courseState.courseCode)
    //         .then((result: AxiosResponse) => {
    //             setAttachments(result.data.attachments);
    //         }).catch((err: AxiosError) => {
    //             showAxiosResponseErrors(err)
    //         });
    // }, [courseState.courseCode, courseState.courseOwner]);

    // const removeAttachment = (id: string) => {
    //     setAttachments([...attachments.filter(item => item.uid !== id)]);
    // }

    const Data = !courseState.attachments.length ? [] : (
        courseState.attachments.map(item =>
            <AttachmentItem key={item.uid}
                data={item}
                courseOwner={courseState.owner}
                courseCode={courseState.code}
                showOptions={true}
            />
        )
    )

    return (
        <Section>
            <AddAttachments />
            {
                Data.length > 0 && 
                <div>
                    <hr />
                    <div>
                        <p className="f2 peam-title-1">
                            Manage current attachments
                        </p>
                    </div>
                    <div>
                        { Data }
                    </div>
                </div>
            }
        </Section>
    );
};