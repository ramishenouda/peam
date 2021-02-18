import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, Button } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';

import { UpdateCourse } from '../../../../../services/course-service';
import { showAxiosResponseErrors } from '../../../../../services/error-handler-service';
import { success } from '../../../../../services/notification-service';

import { CourseState } from '../../../../../store/course/types';
import { updateCourse } from '../../../../../store/course/actions';
import { CourseForUpdate } from '../../../../../models/course';

import { Section } from '../settings-style';
import { SystemState } from '../../../../../store/system/types';

type Props = {
    
};

export const CourseInfo = (props: Props) => {
    const dispatch = useDispatch()
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const initialCourse: CourseForUpdate = {
        code: courseState.code,
        description: courseState.description,
        title: courseState.title,
        ownerId: courseState.ownerId
    }

    const [course, setCourse] = useState(initialCourse);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setCourse({...course, [name]: value});
    };

    const submit = () => {
        UpdateCourse(courseState.owner, courseState.code, course, systemState)
            .then(() => {
                dispatch(updateCourse({
                    ...courseState, ...course
                }))
                success('Coures updated successfully');
            }).catch((err) => {
                showAxiosResponseErrors(err);
            });
    }

    const Schema = yup.object().shape({
        title: yup.string().required('Title is a required field').max(50, 'Ensure this field has no more than 50 characters.')
            .test('Doesn\'t contain special characters test', 'Title can\'t contain special characters', (value) => {
                return !value?.match(/[$-/:-?{-~!"^_`[\]]/);
            }),
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
                        defaultValue={courseState.title}
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
                        defaultValue={courseState.code}
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
                        defaultValue={courseState.description}
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