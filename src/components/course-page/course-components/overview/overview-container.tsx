import React from 'react';

import { Course } from '../../../../models/course';

import { OverView as View } from './overview-view';

type Props = {
    course: Course;
}

export const OverView = (props: Props) => {
    return (
        <View course={props.course} />
    );
}
