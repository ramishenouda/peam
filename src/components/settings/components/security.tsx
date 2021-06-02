import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Container } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { success } from '../../../services/notification-service';
import { showAxiosResponseErrors } from '../../../services/error-handler-service';
import { PasswordChange } from '../../../services/auth-service';

import { UserForSecurityUpdate as User } from '../../../models/user';
import { SystemState } from '../../../store/system/types';

import { RequestPasswordReset } from '../../password-reset/request-password-reset';

import { Title, Description, Form } from '../settings-style';

type Props = {
  options: {};
};

const SignupSchema = yup.object().shape({
  current_password: yup
    .string()
    .required('password is a required field')
    .min(6, "password can't be less than 6 characters"),
  new_password1: yup
    .string()
    .required('new password is a required field')
    .min(6, "new password can't be less than 6 characters"),
  new_password2: yup
    .string()
    .required('Confirm new password is a required field')
    .min(6, "Confirm new password can't be less than 6 characters")
    .oneOf([yup.ref('new_password1'), null], 'Passwords must match'),
});

export const Security = (props: Props) => {
  // todo: a page for password reset.
  const systemState: SystemState = useSelector((state: any) => state.system);

  const initialUser: User = {
    current_password: '',
    new_password1: '',
    new_password2: '',
  };

  const [user, setUser] = useState(initialUser);
  const [updatingUser, setUpdatingUser] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const { register, handleSubmit, errors, formState } = useForm<User>({
    mode: 'all',
    resolver: yupResolver(SignupSchema),
  });

  const { isValid } = formState;

  const updateUser = () => {
    setUpdatingUser(true);
    PasswordChange(
      user.current_password,
      user.new_password1,
      user.new_password2,
      systemState.token
    )
      .then((result) => {
        success('Password changed successfully');
        setTimeout(() => {
          window.location.reload();
        }, 250);
      })
      .catch((err) => {
        showAxiosResponseErrors(err);
      })
      .finally(() => setUpdatingUser(false));
  };

  return (
    <Container className="login">
      <Title className="f1 no-select text-left">Security</Title>
      <Description className="f3 no-select text-left">
        Here you can change or reset your password.
      </Description>
      <Container className="mt-4">
        <Title className="no-select">
          <h2>Change your password</h2>
        </Title>
        <Form className="mb-5 text-left" onSubmit={handleSubmit(updateUser)}>
          <Form.Group controlId="current_password">
            <Form.Label>
              Current password: <span className="required-text">*</span>
            </Form.Label>
            <Form.Control
              disabled={updatingUser}
              onChange={handleChange}
              name="current_password"
              ref={register}
              type="password"
              placeholder="Current password"
            />
            <p className="required-text">
              {' '}
              {errors.current_password?.message}{' '}
            </p>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>
              New password: <span className="required-text">*</span>
            </Form.Label>
            <Form.Control
              disabled={updatingUser}
              onChange={handleChange}
              name="new_password1"
              ref={register}
              type="password"
              placeholder="New password"
            />
            <p className="required-text"> {errors.new_password1?.message} </p>
          </Form.Group>
          <Form.Group controlId="new_password2">
            <Form.Label>
              Confirm new password: <span className="required-text">*</span>
            </Form.Label>
            <Form.Control
              disabled={updatingUser}
              onChange={handleChange}
              name="new_password2"
              ref={register}
              type="password"
              placeholder="Confirm new password"
            />
            <p className="required-text"> {errors.new_password2?.message} </p>
          </Form.Group>
          <Form.Group className="text-center">
            {updatingUser ? (
              <CircleLoader
                size={35}
                color={'#1a1a1a'}
                loading={updatingUser}
              />
            ) : (
              <Button variant="dark" type="submit" disabled={!isValid}>
                Update my security
              </Button>
            )}
          </Form.Group>
        </Form>
      </Container>
      <hr />
      <RequestPasswordReset hideOptions={true} />
    </Container>
  );
};
