import React from 'react';


import { CourseInfo } from './settings-components/course-info';
import { Students } from './settings-components/students';
import { Teachers } from './settings-components/teachers';
import { Attachments } from './settings-components/attachments/attachments';
import { Container } from './settings-style';

type Props = {

};

export const SettingsView = (props: Props) => {
    return (
        <Container className="my-4">
            <CourseInfo />
            <Students />
            <Teachers />
            <Attachments />
        </Container>
    );
};
