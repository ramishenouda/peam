import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Container, Form } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { UserForRegistration as User } from '../../models/user';
import './register-styles.css';

type Props = {
  register: (user: User) => void;
  registering: boolean;
};

const SignupSchema = yup.object().shape({
  role: yup.string(),
  email: yup.string().email().required('Email is a required field'),
  username: yup
    .string()
    .required('Username is a required field')
    .min(2, "Username can't be less than 2 characters")
    .test(
      "Doesn't contain special characters test",
      "Username can't contain special characters",
      (value) => {
        return !value?.match(/[_\W]/);
      }
    ),
  password1: yup
    .string()
    .required('password is a required field')
    .min(6, "password can't be less than 6 characters"),
  password2: yup
    .string()
    .required('Confirm password is a required field')
    .min(6, "Confirm password can't be less than 6 characters")
    .oneOf([yup.ref('password1'), null], 'Passwords must match'),
  emailPreferences: yup.boolean(),
});

function RegisterView(props: Props) {
  const initialUser: User = {
    email: '',
    password1: '',
    password2: '',
    username: '',
  };

  const [user, setUser] = useState(initialUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const { register, handleSubmit, errors, formState } = useForm<User>({
    mode: 'all',
    resolver: yupResolver(SignupSchema),
  });

  const { isValid } = formState;

  return (
    <div className="register">
      <h1 className="register-header">Join Peam</h1>
      <Container>
        <Form
          className="register-form md-lg-8 mb-5"
          onSubmit={handleSubmit(props.register)}
        >
          <Form.Group controlId="username">
            <Form.Label>
              Username <span className="required-text">*</span>
            </Form.Label>
            <Form.Control
              disabled={props.registering}
              className="form-peam"
              onChange={handleChange}
              name="username"
              ref={register}
              type="text"
            />
            <p className="required-text">
              {' '}
              {errors.username && errors.username.message}{' '}
            </p>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>
              Email address <span className="required-text">*</span>
            </Form.Label>
            <Form.Control
              disabled={props.registering}
              className="form-peam"
              onChange={handleChange}
              name="email"
              ref={register}
              type="email"
            />
            <p className="required-text">
              {' '}
              {errors.email && errors.email.message}{' '}
            </p>
          </Form.Group>
          <Form.Group controlId="password1">
            <Form.Label>
              password <span className="required-text">*</span>
            </Form.Label>
            <Form.Control
              disabled={props.registering}
              className="form-peam"
              onChange={handleChange}
              name="password1"
              ref={register}
              type="password"
            />
            <p className="required-text"> {errors.password1?.message} </p>
          </Form.Group>
          <Form.Group controlId="password2">
            <Form.Label>
              Confirm password <span className="required-text">*</span>
            </Form.Label>
            <Form.Control
              disabled={props.registering}
              className="form-peam"
              onChange={handleChange}
              name="password2"
              ref={register}
              type="password"
            />
            <p className="required-text"> {errors.password2?.message} </p>
          </Form.Group>
          {props.registering ? (
            <CircleLoader
              size={35}
              color={'#1a1a1a'}
              loading={props.registering}
            />
          ) : (
            <Button variant="dark" type="submit" disabled={!isValid}>
              Create my account
            </Button>
          )}
        </Form>
      </Container>
    </div>
  );
}

export default RegisterView;
