import React from 'react';
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, Container, Form } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { UserForRegistration as User } from '../../models/user';
import './register-styles.css';

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  register: (user: User) => void,
  registering: boolean,
  emailPreferences: boolean
}

const SignupSchema = yup.object().shape({
  username: yup.string().required('Username is a required field').min(2, 'Username can\'t be less than 2 characters'),
  email: yup.string().email().required('Email is a required field'),
  password: yup.string().required('Password is a required field').min(6, 'Password can\'t be less than 6 characters'),
  confirmPassword: yup.string().required('Confirm password is a required field').min(6, 'Confirm password can\'t be less than 6 characters').oneOf([yup.ref('password'), null], 'Passwords must match'),
  emailPreferences: yup.boolean()
});

function RegisterView(props: Props) {
  const { register, handleSubmit, errors, formState } = useForm<User>({
    mode: "all",
    resolver: yupResolver(SignupSchema)
  });

  const { isValid } = formState;

  return (
    <div className="register">
      <h1 className="register-header">
        Join Peam
      </h1>
      <Container>
        <Form className="register-form md-lg-8 mb-5" onSubmit={handleSubmit(props.register)}>
          <Form.Group controlId="username">
            <Form.Label>Username <span className="required-text">*</span></Form.Label>
            <Form.Control onChange={props.handleChange} name="username" ref={register} type="text" />
            <p className="required-text"> { errors.username && errors.username.message } </p>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address <span className="required-text">*</span></Form.Label>
            <Form.Control onChange={props.handleChange} name="email" ref={register} type="email" />
            <p className="required-text"> {errors.email && errors.email.message} </p>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password <span className="required-text">*</span></Form.Label>
            <Form.Control onChange={props.handleChange} name="password" ref={register} type="password" />
            <p className="required-text"> {errors.password?.message} </p>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm password <span className="required-text">*</span></Form.Label>
            <Form.Control onChange={props.handleChange} name="confirmPassword" ref={register} type="password" />
            <p className="required-text"> {errors.confirmPassword?.message} </p>
          </Form.Group>
          <Form.Group controlId="notifications">
            <Form.Label>Email preferences <span className="required-text">*</span></Form.Label>
            <Form.Check  onChange={props.handleChange} name="emailPreferences" checked={props.emailPreferences} ref={register} type="checkbox" label="Send me notifications about my courses." />
          </Form.Group>
            {props.registering? (
              <CircleLoader size={35} color={"#9c27b0"} loading={props.registering} />
            ) : (
              <Button disabled={ !isValid } variant="primary" type="submit">
                Create my account
              </Button>
            )}
        </Form>
      </Container>
    </div>
  );
}

export default RegisterView;
