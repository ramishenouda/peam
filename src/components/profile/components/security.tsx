import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Container, Form } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { UserForUpdate as User } from '../../../models/user';

import { Title, Description } from '../profile-style';

type Props = {
    
};

const SignupSchema = yup.object().shape({
    current_password: yup.string().required('password is a required field').min(6, 'password can\'t be less than 6 characters'),
    new_password1: yup.string().required('new password is a required field').min(6, 'new password can\'t be less than 6 characters'),
    new_password2: yup.string().required('Confirm new password is a required field').min(6, 'Confirm new password can\'t be less than 6 characters').oneOf([yup.ref('new_password1'), null], 'Passwords must match'),
});

export const Security = (props: Props) => {
    const initialUser: User = {
        avatar: '',
        email: '',
        full_name: '',
        current_password: '',
        new_password1: '',
        new_password2: '',
        uid: ''
    }

    const [user, setUser] = useState(initialUser);
    const [updatingUser, setUpdatingUser] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setUser({...user, [name]: value});
    };

    const { register, handleSubmit, errors, formState } = useForm<User>({
        mode: "all",
        resolver: yupResolver(SignupSchema)
    });
    
    const { isValid } = formState;

    const updateUser = () => {
        setUpdatingUser(true);
        console.log(user);
    }

    return (
        <Container>
        <Title className="f1 no-select">
            Security
        </Title>
        <Description className="f3 no-select">
            Here you can change your password.
        </Description>
        <Form className="mt-2" onSubmit={handleSubmit(updateUser)}>
            <Form.Group controlId="current_password">
                <Form.Label>Current password: <span className="required-text">*</span></Form.Label>
                <Form.Control 
                    disabled={updatingUser}
                    onChange={handleChange}
                    name="current_password"
                    ref={register}
                    type="password"
                />
                <p className="required-text"> { errors.current_password?.message } </p>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>New password: <span className="required-text">*</span></Form.Label>
                <Form.Control 
                disabled={updatingUser} 
                onChange={handleChange} 
                name="new_password1" 
                ref={register}
                type="password" 
            />
                <p className="required-text"> { errors.new_password1?.message } </p>
            </Form.Group>
            <Form.Group controlId="new_password2">
                <Form.Label>Confirm new password: <span className="required-text">*</span></Form.Label>
                <Form.Control 
                    disabled={updatingUser} 
                    onChange={handleChange} 
                    name="new_password2" 
                    ref={register} 
                    type="password" 
                />
                <p className="required-text"> {errors.new_password2?.message} </p>
            </Form.Group>
            {updatingUser? (
            <CircleLoader size={35} color={"#1a1a1a"} loading={updatingUser} />
            ) : (
            <Button variant="dark" type="submit" disabled={ !isValid }>
                Update my security
            </Button>
            )}
        </Form>
      </Container>
    );
};
