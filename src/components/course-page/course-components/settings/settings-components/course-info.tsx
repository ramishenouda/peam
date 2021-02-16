import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, Button } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';

import { CourseState } from '../../../../../store/course/types';
import { CourseForUpdate } from '../../../../../models/course';

import { Section } from '../settings-style';

type Props = {
    
};

export const CourseInfo = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);

    const initialCourse: CourseForUpdate = {
        attachments: [],
        code: '',
        description: '',
        owner: '',
        title: '',
    }

    const [course, setCourse] = useState(initialCourse);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setCourse({...course, [name]: value});
    };

    const submit = () => {
        console.log(course);
    }

    const Schema = yup.object().shape({
        title: yup.string().required('Title is a required field').max(50, 'Ensure this field has no more than 50 characters.'),
        code: yup.string().required('Code is a required field').max(10, 'Ensure this field has no more than 10 characters.'),
        description: yup.string(),
    });

    const { register, handleSubmit, errors, formState } = useForm<CourseForUpdate>({
        mode: "all",
        resolver: yupResolver(Schema)
    });

    const { isValid } = formState;

    return (
        <Section id="course-settings">
            <div>
                <p className="peam-title-1 f1">
                    Course
                </p>
                <hr />
            </div>
            <Form className="" onSubmit={handleSubmit(() => submit())}>
                <Form.Group controlId="title">
                    <Form.Label className="f3">Title <span className="required-text">*</span></Form.Label>
                    <Form.Control
                        className="f2"
                        type="text"
                        autoComplete="off"
                        defaultValue={courseState.courseTitle}
                        onChange={handleChange}
                        name="title"
                        ref={register}
                    />
                    <p className="required-text"> {errors.title?.message} </p>
                </Form.Group>
                <Form.Group controlId="code">
                    <Form.Label className="f3">Code <span className="required-text">*</span></Form.Label>
                    <Form.Control
                        className="f2"
                        type="text"
                        autoComplete="off"
                        defaultValue={courseState.courseCode}
                        onChange={handleChange}
                        name="code"
                        ref={register}
                    />
                    <p className="required-text"> {errors.code?.message} </p>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label className="f3">Description <span className="required-text">*</span></Form.Label>
                    <TextareaAutosize
                        minRows={3}
                        className="form-control f3" 
                        onChange={handleChange}
                        defaultValue={courseState.courseDescription}
                        name="description"
                        ref={register}
                    />
                    <p className="required-text"> {errors.description?.message} </p>
                </Form.Group>
                <Form.Group>
                    <Button type="submit" className="px-5 py-2" variant="dark" disabled={ !isValid }>
                        Save
                    </Button>
                </Form.Group>
            </Form>
        </Section>
    );
};