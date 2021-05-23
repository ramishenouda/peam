import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Form } from 'react-bootstrap';

import { Project } from 'models';

import { CourseState } from '../../../store/course/types';
import { SystemState } from '../../../store/system/types';

import { success } from '../../../services/notification-service';
import { showAxiosResponseErrors } from '../../../services/error-handler-service';

import { Section } from '../../../style';
import { updateProject } from 'services/project-service';
import { TextareaAutosize } from 'components/course-new/new-course-style';

type Props = {
  _project: Project;
};

interface Params {
  code: string;
  owner: string;
  type: string;
  title_1: string;
  title_2: string;
}

export const ManageProject = ({ _project }: Props) => {
  const params: Params = useParams();
  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);

  const initialProject: Project = {
    title: _project.title,
    project_zip: { files: [] },
    uid: '',
  };

  const [project, setProject] = useState(initialProject);
  const req = courseState.requirements.filter(
    (req) => req.title === params.title_1
  )[0];

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const Schema = yup.object().shape({
    title: yup
      .string()
      .required('Title is a required field')
      .max(50, 'Ensure this field has no more than 50 characters.'),
    description: yup.string(),
  });

  const { register, handleSubmit, errors, formState } = useForm<Project>({
    mode: 'all',
    resolver: yupResolver(Schema),
  });

  const { isValid } = formState;
  const submit = () => {
    const payLoad = {
      title: project.title,
      description: project.description,
    };
    updateProject(
      courseState.owner,
      courseState.code,
      params.title_1,
      params.title_2,
      _project.title,
      systemState,
      payLoad
    )
      .then((result) => {
        success('Project updated successfully');
      })
      .catch((err) => {
        console.log(err);
        showAxiosResponseErrors(err);
      });
  };

  if (!req) return <Redirect to="/" />;
  if (!_project) {
    return <span>no project yet.</span>;
  }

  return (
    <div>
      <Section>
        <div>
          <p className="peam-title-1 f1">Project</p>
        </div>
        <Form className="" onSubmit={handleSubmit(() => submit())}>
          <Form.Group controlId="title">
            <Form.Label className="f3">
              Title <span className="required-text">*</span>
            </Form.Label>
            <Form.Control
              className="f2"
              type="text"
              autoComplete="off"
              defaultValue={_project.title}
              onChange={handleChange}
              name="title"
              ref={register}
            />
            <p className="required-text"> {errors.title?.message} </p>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label className="f3">Description</Form.Label>
            <TextareaAutosize
              minRows={3}
              className="form-control f3"
              // onChange={(e: any) => setDescription(e.target.value)}
              name="description"
              ref={register}
            />
            <p className="required-text"> {errors.description?.message} </p>
          </Form.Group>
          <Form.Group>
            <Button
              type="submit"
              className="px-5 py-2"
              variant="dark"
              disabled={!isValid}
            >
              Save
            </Button>
          </Form.Group>
        </Form>
      </Section>
    </div>
  );
};
