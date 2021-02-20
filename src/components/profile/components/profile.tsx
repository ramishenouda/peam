import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Container, Form } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { UserForUpdate as User } from '../../../models/user';
import { SystemState } from '../../../store/system/types';

import { Title, Description } from '../profile-style';

type Props = {
    
};

const SignupSchema = yup.object().shape({
    avatar: yup.string(),
    full_name: yup.string(),
    email: yup.string().email().required('Email is a required field'),
    new_password1: yup.string().required('password is a required field').min(6, 'password can\'t be less than 6 characters'),
  });

export const Profile = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);
    
    const initialUser: User = {
        avatar: '',
        email: '',
        full_name: systemState.full_name,
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

    useEffect(() => {

    }, [])

    const updateUser = () => {
        setUpdatingUser(true);
    }

    return (
        <Container>
        <Title className="f1 no-select">
            Your profile
        </Title>
        <Description className="f3 no-select">
            Here you can update your settings, and set your full name.
        </Description>
        <Form className="mt-2" onSubmit={handleSubmit(updateUser)}>
            <Form.Group controlId="full_name">
                <Form.Label>Full name</Form.Label>
                <Form.Control 
                    disabled={updatingUser}
                    onChange={handleChange}
                    name="full_name"
                    ref={register}
                    type="text"
                    defaultValue={user.full_name}
                />
                <p className="required-text"> { errors.full_name?.message } </p>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email address <span className="required-text">*</span></Form.Label>
                <Form.Control 
                disabled={updatingUser} 
                onChange={handleChange} 
                name="email" 
                ref={register}
                type="email" 
            />
                <p className="required-text"> { errors.email?.message } </p>
            </Form.Group>
            <Form.Group controlId="new_password1">
                <Form.Label>Your password <span className="required-text">*</span></Form.Label>
                <Form.Control 
                    disabled={updatingUser} 
                    onChange={handleChange} 
                    name="new_password1" 
                    ref={register} 
                    type="password" 
                />
                <p className="required-text"> {errors.new_password1?.message} </p>
            </Form.Group>
            {updatingUser? (
            <CircleLoader size={35} color={"#1a1a1a"} loading={updatingUser} />
            ) : (
            <Button variant="dark" type="submit" disabled={ !isValid }>
                Update my profile
            </Button>
            )}
        </Form>
      </Container>
    );
};
