import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Creatable from 'react-select/creatable';
import { Button } from 'react-bootstrap';

import { error, success } from '../../services/notification-service';
import { showAxiosResponseErrors } from '../../services/error-handler-service';

import { UserToInviteToCourse } from '../../models/user';
import { CourseState } from '../../store/course/types';
import { SystemState } from '../../store/system/types';

import { Section } from '../../style';

type Props = {
    title: string;
    buttonTitle?: string;
    successMessage?: string;
    errorTitle?: string;
    errorText?: string;
    inviteFunction: (...args: any[]) => Promise<any>;
    inviteFunctionArgs: any[];
    payloadArgs: any[];
    thenFunction?: () => void;
    catchFunction?: () => void;
    finallyFunction?: () => void;
};

interface Email {
    label: string;
    value: string;
}

interface Fail {
    email: string;
    error: Array<string>;
}

export const InviteBox = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const [emails, setEmails] = useState(Array<Email>());

    const handleInputChange = (_value: any, action: any) => {
        if(action.action === 'remove-value') {
            const removedValue = action.removedValue.value;
            setEmails(emails.filter(item => item.value !== removedValue));
            return;
        }

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

        const successMessage = props.successMessage ? props.successMessage : 'Students invited successfully';
        const errorTitle = props.errorTitle ? props.errorTitle : 'The following emails couldn\'t be invited';
        const errorText = props.errorText ? props.errorText : '';
    
        const users: UserToInviteToCourse = {
            course: courseState.id,
            emails: _eamils,
            expiry_date: date,
            type: 'student'
        }

        props.inviteFunction(courseState.owner, courseState.code, users, systemState)
            .then((result) => {
                if (props.thenFunction) {
                    props.thenFunction();
                    return;
                }

                const fails: Array<Fail> = result.data.fail;
                if (fails.length < 1) {
                    success(successMessage)
                } else {
                    let message = '';
                    for(let i = 0; i < fails.length; i++) {
                        message += fails[i].email + '</br>';
                    }
                    error(errorTitle, errorText ? errorText : message);
                }
            }).catch((err) => {
                props.catchFunction && props.catchFunction();
                !props.catchFunction && showAxiosResponseErrors(err);
            }).finally(() => {
                props.finallyFunction && props.finallyFunction();
            });
    }

    return (
        <Section id="peam-title-1 invite-students">
            <p className="f1">
                { props.title }
            </p>
            <hr />
            <div>
                <Creatable isMulti isClearable onChange={handleInputChange}  value={emails} />
            </div>
            <div>
                <Button variant="dark" onClick={invite} disabled={ !emails.length } className="my-2 px-5 py-2">
                    { !props.buttonTitle && 'Send Invite' }
                    { props.buttonTitle && props.buttonTitle }
                </Button>
            </div>
        </Section>
    );
};
