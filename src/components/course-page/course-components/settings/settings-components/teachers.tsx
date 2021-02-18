import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Creatable from 'react-select/creatable';
import { Button } from 'react-bootstrap';

import { error, success } from '../../../../../services/notification-service';
import { InviteToCourse } from '../../../../../services/course-service';
import { showAxiosResponseErrors } from '../../../../../services/error-handler-service';

import { UserToInviteToCourse } from '../../../../../models/user';
import { CourseState } from '../../../../../store/course/types';

import { Section } from '../settings-style';

type Props = {
    
};

interface Email {
    label: string;
    value: string;
}

export const Teachers = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const [emails, setEmails] = useState(Array<Email>());

    const handleInputChange = (_value: any, action: any) => {
        if (_value.length < 1) {
            setEmails([]);
            return;
        }

        const value = _value[_value.length - 1].value;
        if((!value || !value.includes('@') || !value.includes('.')) && action.action === 'create-option') {
            error('Must be a valid email');
            return;
        }

        setEmails([...emails, {label: value, value: value}])
    };

    const invite = () => {
        const _eamils = emails.map(item => item.value);
        const date = new Date();
        date.setDate(date.getDate() + 7)

        const users: UserToInviteToCourse = {
            course: courseState.id,
            emails: _eamils,
            expiry_date: date,
            type: 'teacher'
        }

        InviteToCourse(courseState.owner, courseState.code, users)
            .then((result) => {
                console.log(result)
                success('Teachers invited successfully')
            }).catch((err) => {
                showAxiosResponseErrors(err);
            });
    }

    return (
        <Section id="invite-teachers peam-title-1">
            <p className="f1">
                Invite Teachers
            </p>
            <hr />
            <div>
                <Creatable isMulti isClearable onChange={handleInputChange}  value={emails} />
            </div>
            <div>
                <Button variant="dark" onClick={invite} disabled={ !emails.length } className="my-2 px-5 py-2">Send Invite</Button>
            </div>
        </Section>
    );
};