import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import { Button, Container } from 'react-bootstrap';
import { TeamForCreation as Team } from '../../../models/team';


type Props = {
    
};

interface Params {
    code: string;
    owner: string;
    type_1: string;
    type_2: string;
    title_1: string;
    title_2: string;
}

const Schema = yup.object().shape({
    name: yup.string().required('Title is a required field').max(50, 'Ensure this field has no more than 50 characters.')
        .test('Doesn\'t contain special characters test', 'Title can only contain @ and # as special characters', (value) => {
            return !value?.match(/[$-/:-?{-~!"^_`[\]]/);
        }),
    code: yup.string().required('Code is a required field').max(10, 'Ensure this field has no more than 10 characters.')
        .test('Doesn\'t contain special characters test', 'Code can\'t contain any special characters', (value) => {
        return !value?.match(/[_\W]/)
    }),
    description: yup.string(),
});

export const CreateTeam = (props: Props) => {
    const params: Params = useParams();

    const { register , handleSubmit, errors, formState } = useForm<Team>({
        mode: "all",
        resolver: yupResolver(Schema)
    });

    const { isValid } = formState;

    const submit = () => {
        // props.createCourse({title, code, description});
    }

    return (
        <Container className="mt-3">
            <Link className="link text-left" to={`/${params.owner}/${params.code}/requirements/${params.title_1}`}>
                <Button variant="outline-dark" className="f1">
                    Go back
                </Button>
            </Link>
        </Container>
    );
};