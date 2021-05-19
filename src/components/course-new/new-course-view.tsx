import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CircleLoader } from 'react-spinners';

import { NewCourse } from '../../models/course';

import {
  Container,
  Form,
  FormControl,
  FormLabel,
  TextareaAutosize,
  Button,
} from './new-course-style';

type Props = {
  createCourse: (course: NewCourse) => void;
  creating: boolean;
};

export const NewCourseView = (props: Props) => {
  const Schema = yup.object().shape({
    title: yup
      .string()
      .required('Title is a required field')
      .max(50, 'Ensure this field has no more than 50 characters.')
      .test(
        "Doesn't contain special characters test",
        'Title can only contain @ and # as special characters',
        (value) => {
          return !value?.match(/[$-/:-?{-~!"^_`[\]]/);
        }
      ),
    code: yup
      .string()
      .required('Code is a required field')
      .max(10, 'Ensure this field has no more than 10 characters.')
      .test(
        "Doesn't contain special characters test",
        "Code can't contain any special characters",
        (value) => {
          return !value?.match(/[_\W]/);
        }
      ),
    description: yup.string(),
  });

  const { register, handleSubmit, errors, formState } = useForm<NewCourse>({
    mode: 'all',
    resolver: yupResolver(Schema),
  });

  const { isValid } = formState;

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const submit = () => {
    props.createCourse({ title, code, description });
  };

  return (
    <Container className="mt-2">
      <header>
        <p className="f3">
          A project course is where you can invite your students or your
          coworkers. <br />
          You can create projcet requirements, and allow your students to upload
          their projects.
        </p>
        <div className="mt-4">
          <h1 className="f1 title">Create a course</h1>
          <hr />
        </div>
      </header>
      <main>
        <div className="mt-2">
          <Form className="" onSubmit={handleSubmit(() => submit())}>
            <Form.Group controlId="title">
              <FormLabel className="f3">
                Title <span className="required-text">*</span>
              </FormLabel>
              <FormControl
                className="f2"
                type="text"
                autoComplete="off"
                onChange={(e: any) => setTitle(e.target.value)}
                name="title"
                ref={register}
              />
              <p className="required-text"> {errors.title?.message} </p>
            </Form.Group>
            <Form.Group controlId="code">
              <FormLabel className="f3">
                Code <span className="required-text">*</span>
              </FormLabel>
              <FormControl
                className="f2"
                type="text"
                autoComplete="off"
                onChange={(e: any) => setCode(e.target.value)}
                name="code"
                ref={register}
              />
              <p className="required-text"> {errors.code?.message} </p>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label className="f3">Description</Form.Label>
              <TextareaAutosize
                minRows={3}
                className="form-control f3"
                onChange={(e: any) => setDescription(e.target.value)}
                name="description"
                ref={register}
              />
              <p className="required-text"> {errors.description?.message} </p>
            </Form.Group>
            <Form.Group>
              {props.creating ? (
                <CircleLoader
                  size={35}
                  color={'#1a1a1a'}
                  loading={props.creating}
                />
              ) : (
                <Button
                  type="submit"
                  className="px-5 py-2"
                  variant="dark"
                  disabled={!isValid}
                >
                  Create course
                </Button>
              )}
            </Form.Group>
          </Form>
        </div>
      </main>
    </Container>
  );
};
