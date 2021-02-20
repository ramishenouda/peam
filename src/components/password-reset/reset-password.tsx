import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Container, Form } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { UserForPasswordReset as User } from '../../models/user';
import { SystemState } from '../../store/system/types';
import { PasswordReset } from '../../services/auth-service';
import { message, success } from '../../services/notification-service';
import { showAxiosResponseErrors } from '../../services/error-handler-service';

interface Params {
    uid: string;
    token: string;
}

type Props = {

};

const SignupSchema = yup.object().shape({
    new_password1: yup.string().required('New password is a required field').min(6, 'password can\'t be less than 6 characters'),
    new_password2: yup.string().required('Confirm new password is a required field').min(6, 'password can\'t be less than 6 characters').oneOf([yup.ref('new_password1'), null], 'Passwords must match'),
});

export const ResetPassword = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);
    const initialUser: User = {
        email: '',
        token: '',
        uid: '',
        new_password1: '',
        new_password2: '',
    }

    const params: Params = useParams();
    const [user, setUser] = useState(initialUser);
    const [reseting, setReseting] = useState(false);
    const [redirect, setRedirect] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };
  
    const { register, handleSubmit, errors, formState } = useForm<User>({
        mode: "all",
        resolver: yupResolver(SignupSchema)
    });

    const { isValid } = formState;

    const resetPassword = () => {
        setReseting(true);
        user.uid = params.uid;
        user.token = params.token;

        PasswordReset(user)
            .then((result) => {
                success('Password was reset successfully', '', () => {
                    message("You can sign in with you new password now.");
                });
                if (systemState.username !== '') {
                    setRedirect(`/${systemState.username}`);
                } else {
                    setRedirect(`/login`);
                }
            }).catch((err) => {
                showAxiosResponseErrors(err);
                setReseting(false);
            });
    }

    if (redirect !== '')
        return <Redirect to={{pathname: redirect}} />

    return (
        <Container className="p-5">
            <h1 className="mb-3">
                Reset Password
            </h1>
            <Form className="mt-2" onSubmit={handleSubmit(resetPassword)}>
                <Form.Group controlId="new_password1">
                    <Form.Label>New password:</Form.Label>
                    <Form.Control 
                        disabled={reseting}
                        onChange={handleChange}
                        name="new_password1"
                        ref={register}
                        type="password"
                    />
                    <p className="required-text"> { errors.new_password1?.message } </p>
                </Form.Group>
                <Form.Group controlId="new_password2">
                    <Form.Label>Confirm new password:</Form.Label>
                    <Form.Control 
                        disabled={reseting}
                        onChange={handleChange}
                        name="new_password2"
                        ref={register}
                        type="password"
                    />
                    <p className="required-text"> { errors.new_password2?.message } </p>
                </Form.Group>
                {
                    reseting ? (
                        <CircleLoader size={35} color={"#1a1a1a"} loading={reseting} />
                    ) : (
                        <Button disabled={ !isValid } variant="dark" type="submit">
                            Reset my password
                        </Button>
                    )
                }
            </Form>
        </Container>
    );
};
