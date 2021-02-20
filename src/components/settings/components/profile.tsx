import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Container } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { UserForUpdate as User } from '../../../models/user';
import { User as Info } from '../../../models/user';
import { SystemState } from '../../../store/system/types';

import defaultAvatar from '../../../assets/default-avatar.png'

import { Title, Description, Form } from '../settings-style';
import { FileToggle, FileUpload } from './style';
import { UpdateAvatar, UpdateUser } from '../../../services/user-service';
import { showAxiosResponseErrors } from '../../../services/error-handler-service';
import { success } from '../../../services/notification-service';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';

type Props = {
    user: Info
};

const SignupSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email().required('Email is a required field'),
  });

export const Profile = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);
    const initialUser: User = {
        uid: '',
        email: props.user.email,
        name: props.user.name,
    }

    const [user, setUser] = useState(initialUser);
    const [updatingUser, setUpdatingUser] = useState(false);
    const [isdirty, setIsdirty] = useState(false);

    useEffect(() => {
        setUser({ uid: '', email: props.user.email, name: props.user.name })
    }, [props.user.email, props.user.name])

    const handleChange = (event: any) => {
        if(!isdirty)
            setIsdirty(true)
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
        UpdateUser(user.name, user.email, systemState.token)
            .then((result) => {
                console.log(result)
                success("Your public profile was updated successfully")
            }).catch((err) => {
                showAxiosResponseErrors(err)
            }).finally(() => setUpdatingUser(false));
    }


    /* const updateAvatar = (event: any) => {
        const formData = new FormData();
        formData.append('content', event.target.files[0])

        UpdateAvatar(formData,systemState.token)
            .then((result) => {
                console.log(result)
            }).catch((err) => {
                showAxiosResponseErrors(err)
                console.log(err);
            });
    } */


    return (
        <Container>
            <div className="text-left">
                <Title className="f1 no-select">
                    Your profile
                </Title>
                <Description className="f3 no-select">
                    Here you can update your public profile, and set your name.
                </Description>
            </div>
            <form method="post" encType="multipart/form-data">
                <Form.Group className="text-center" controlId="avatar">
                    {/* <FileUpload multiple={false} accept="image/*" onChange={updateAvatar} name="avatar" id="avatar" label="Change your avatar" /> */}
                    <label htmlFor="avatar">
                        <FileToggle src={defaultAvatar} alt={initialUser.name} />
                    </label>
                </Form.Group>
            </form>
            <Form className="login text-left" onSubmit={handleSubmit(updateUser)}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        disabled={updatingUser}
                        onChange={handleChange}
                        name="name"
                        ref={register}
                        type="text"
                        defaultValue={initialUser.name}
                        placeholder="Name"
                    />
                    <p className="required-text"> { errors.name?.message } </p>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address <span className="required-text">*</span></Form.Label>
                    <Form.Control 
                    disabled={updatingUser} 
                    onChange={handleChange} 
                    name="email" 
                    ref={register}
                    type="email"
                    placeholder="Email"
                    defaultValue={initialUser.email}
                />
                    <p className="required-text"> { errors.email?.message } </p>
                </Form.Group>
                {/* <Form.Group controlId="new_password1">
                    <Form.Label>Your password <span className="required-text">*</span></Form.Label>
                    <Form.Control 
                        disabled={updatingUser}
                        onChange={handleChange} 
                        name="new_password1"
                        ref={register}
                        type="password"
                        placeholder="Enter your password"
                    />
                    <p className="required-text"> {errors.new_password1?.message} </p>
                </Form.Group> */}
                { updatingUser? (
                    <CircleLoader size={35} color={"#1a1a1a"} loading={updatingUser} />
                ) : (
                    <Button variant="dark" type="submit" disabled={ !isValid || !isdirty }>
                        Update my profile
                    </Button>
                )}
            </Form>
      </Container>
    );
};
