import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DeleteCourse } from '../../../../../services/course-service';
import { showAxiosResponseErrors } from '../../../../../services/error-handler-service';
import { confirmText, error, success } from '../../../../../services/notification-service';

import { CourseState } from '../../../../../store/course/types';
import { SystemState } from '../../../../../store/system/types';

import { Section } from '../settings-style';

type Props = {
    
};

export const Dangerous = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const removeCourse = () => {
        confirmText('You can\'t revert this', 
            `This will delete everything.
                </br>type the course title to confirm: </br> <strong> ${courseState.title} </strong>`,
            'Course title',
            courseState.title
        ).then((result) => {
            if (!result.isConfirmed) {
                return;
            }

            const value: string = result.value;
            if (value !== courseState.title) {
                error('Wrong title', 'Deleting has been canceled.');
                return;
            }

            DeleteCourse(courseState.owner, courseState.code, systemState)
                .then(() => {
                    success('Course deleted successfully');
                    setTimeout(() => {
                        window.location.replace("http://localhost:3000/");
                    }, 500);
                }).catch((err) => {
                    showAxiosResponseErrors(err);
                });
        })
    }

    return (
        <Section id="invite-teachers peam-title-1">
            <div>
                <Button variant="danger" onClick={removeCourse} disabled={ courseState.owner !== systemState.username } className="my-2 px-5 py-2">Remove the course</Button>
            </div>
        </Section>
    );
};