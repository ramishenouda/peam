import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Form } from 'react-bootstrap';
import { CircleLoader as Loader } from 'react-spinners';

import { Team } from '../../../models/team';
import { Member } from '../../../models/memeber';

import { CourseState } from '../../../store/course/types';
import { SystemState } from '../../../store/system/types';

import { RemoveStudent, UpdateTeam } from '../../../services/team-servce';
import { success } from '../../../services/notification-service';
import { showAxiosResponseErrors } from '../../../services/error-handler-service';

import { ListMembers } from 'components/list-members/list-members';

import { Section } from 'style';

type Props = {
  team: Team;
  setTeam: (tab: Team) => void;
};

interface Params {
  code: string;
  owner: string;
  type: string;
  title_1: string;
  title_2: string;
}

export const ManageTeam = (props: Props) => {
  const params: Params = useParams();
  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);

  const [team, setTeam] = useState(props.team);
  const [updatingTeam, setUpdatingTeam] = useState(false);

  const req = courseState.requirements.filter(
    (req) => req.title === params.title_1
  )[0];

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  };

  const Schema = yup.object().shape({
    name: yup
      .string()
      .required('Name is a required field')
      .max(50, 'Ensure this field has no more than 50 characters.'),
  });

  const { register, handleSubmit, errors, formState } = useForm<Team>({
    mode: 'all',
    resolver: yupResolver(Schema),
  });

  const { isValid } = formState;
  const submit = () => {
    setUpdatingTeam(true);
    const payLoad = {
      name: team.name,
    };

    UpdateTeam(
      courseState.owner,
      courseState.code,
      params.title_1,
      systemState,
      params.title_2,
      payLoad
    )
      .then((result) => {
        success('Team updated successfully');
        setTimeout(() => {
          window.location.replace(payLoad.name);
        }, 250);
      })
      .catch((err) => {
        console.log(err);
        showAxiosResponseErrors(err);
      })
      .finally(() => setUpdatingTeam(false));
  };

  const removeStudent = (member: Member) => {
    RemoveStudent(
      courseState.owner,
      courseState.code,
      params.title_1,
      systemState,
      params.title_2,
      member.username
    )
      .then((result) => {})
      .catch((err) => {});
  };

  // todo: change title to name
  if (!req) return <Redirect to="/" />;
  return (
    <div>
      <Section>
        <div>
          <p className="peam-title-1 f1">Team</p>
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
              defaultValue={team.name}
              onChange={handleChange}
              name="name"
              ref={register}
            />
            <p className="required-text"> {errors.name?.message} </p>
          </Form.Group>
          <Form.Group>
            {!updatingTeam ? (
              <Button
                type="submit"
                className="px-5 py-2"
                variant="dark"
                disabled={!isValid || props.team.name === team.name}
              >
                Save
              </Button>
            ) : (
              <Loader size={35} color={'#1a1a1a'} loading={updatingTeam} />
            )}
          </Form.Group>
        </Form>
      </Section>
      <hr />
      <Section>
        <div>
          <p className="peam-title-1 f1">Students</p>
        </div>
        <ListMembers
          showButton={true}
          ButtonText="Remove"
          optionFuncton={removeStudent}
          members={props.team.students}
        />
      </Section>
    </div>
  );
};
