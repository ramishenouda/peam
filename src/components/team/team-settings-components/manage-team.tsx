import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Team } from "../../../models/team";
import { Member } from "../../../models/memeber";

import { CourseState } from "../../../store/course/types";
import { SystemState } from "../../../store/system/types";

import { Button, Form } from 'react-bootstrap';
import { Section } from '../../../style';
import { ListMembers } from "../../list-members/list-members";

type Props = {
    team: Team;
    setTeam: (tab: Team) => void;
};

export const ManageTeam = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const initialTeam: Team = {
        name: props.team.name,
        students: props.team.students
    }

    const [team, setTeam] = useState(initialTeam);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setTeam({...team, [name]: value});
    };

    const Schema = yup.object().shape({
        name: yup.string().required('Title is a required field').max(50, 'Ensure this field has no more than 50 characters.')
    });

    const { register, handleSubmit, errors, formState } = useForm<Team>({
        mode: "all",
        resolver: yupResolver(Schema)
    });

    const { isValid } = formState;
    const submit = () => {
        console.log(team);
    }

    const removeStudent = (member: Member) => {
        // call the api to remove the student.
    }

    return (
        <div>
        <Section>
            <div>
                <p className="peam-title-1 f1">
                    Team
                </p>
            </div>
            <Form className="" onSubmit={handleSubmit(() => submit())}>
                <Form.Group controlId="title">
                    <Form.Label className="f3">Title <span className="required-text">*</span></Form.Label>
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
                    <Button type="submit" className="px-5 py-2" variant="dark" disabled={ !isValid }>
                        Save
                    </Button>
                </Form.Group>
            </Form>
        </Section>
        <hr />
        <Section>
            <div>
                <p className="peam-title-1 f1">
                    Students
                </p>
            </div>
            <ListMembers showButton={true} ButtonText="Remove" optionFuncton={removeStudent} members={props.team.students} />
        </Section>
        </div>
    );
};
