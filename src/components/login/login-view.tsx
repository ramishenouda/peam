import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, Container, Form } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

import { UserForLogin as User } from '../../models/user';

import './login-styles.css';
import { Link } from 'react-router-dom';

type Props = {
  login: (user: User) => void,
  logging: boolean,
}

const SignupSchema = yup.object().shape({
  username: yup.string().required('Username or email is a required field').min(2, 'Username can\'t be less than 2 characters'),
  password: yup.string().required('Password is a required field').min(6, 'Password can\'t be less than 6 characters'),
});

function LoginView(props: Props) {
  const { register, handleSubmit, errors, formState } = useForm<User>({
    mode: "all",
    resolver: yupResolver(SignupSchema)
  });
  
  const { isValid } = formState;
  const initialUser: User = {
    password: '',
    username: ''
  }

  const [user, setUser] = useState(initialUser);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="login">
      <h2 className="login-header">
        Sign in to Peam
      </h2>
      <Container>
        <Form className="login-form mb-5" onSubmit={handleSubmit(props.login)}>
          <Form.Group controlId="username">
            <Form.Label>Username or email address <span className="required-text">*</span></Form.Label>
            <Form.Control className="form-peam" onChange={handleChange} name="username" ref={register} type="text" />
            <p className="required-text"> { errors.username && errors.username.message } </p>
          </Form.Group>
          <Form.Group controlId="password" style={{clear: "both"}}>
            <Form.Label>Password <span className="required-text">*</span></Form.Label>
            <Link className="float-right link" to="/password_reset">Forget password?</Link>
            <Form.Control className="form-peam" onChange={handleChange} name="password" ref={register} type="password" />
            <p className="required-text"> {errors.password?.message} </p>
          </Form.Group>
          {props.logging? (
            <CircleLoader size={35} color={"#1a1a1a"} loading={props.logging} />
            ) : (
            <Button disabled={ !isValid } variant="dark" type="submit">
              Sign in
            </Button>
          )}
        </Form>
      </Container>
      <Container className={`register-to-peam text-center`}>
        New to Peam? <Link to="/join" className="link">Create an account</Link>
      </Container>
    </div>
  );
}

export default LoginView;
