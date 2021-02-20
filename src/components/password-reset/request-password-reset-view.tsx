import React from 'react';
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { Button, Container, Form } from 'react-bootstrap';

import { UserForPasswordReset as User } from '../../models/user';

type Props = {
  register: (user: User) => void
  hideTitle?: boolean;
  hideOptions?: boolean;
}

const SignupSchema = yup.object().shape({
  email: yup.string().email().required('email is a required field')
});

function PasswordResetView(props: Props) {
  const { register, handleSubmit, errors, formState } = useForm<User>({
    mode: "all",
    resolver: yupResolver(SignupSchema)
  });

  const { isValid } = formState;

  return (
  <div className="login">
      {
        (!props.hideTitle) &&
        <h2 className="login-header no-select">
          Reset your password
        </h2>
      }
      <Container>
        <Form className="login-form md-lg-8 mb-5" onSubmit={handleSubmit(props.register)}>
          <Form.Group controlId="username">
            <Form.Label>Enter your account's email address and we will send you a reset link. <span className="required-text">*</span></Form.Label>
            <Form.Control name="email" placeholder="Email address" ref={register} type="text" />
            <p className="required-text"> { errors.email && errors.email.message } </p>
          </Form.Group>
          <Button disabled={ !isValid } variant="dark" type="submit">
            Send password reset link
          </Button>
        </Form>
      </Container>
      {
        (!props.hideOptions) &&
        <Container className={`register-to-peam text-center`}>
          <Link to="/join" className="link">Create an account</Link>
            |
          <Link to="/login" className="link">Login</Link>
        </Container>
      }
    </div>
  );
}

export default PasswordResetView;
