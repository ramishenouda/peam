import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CircleLoader } from 'react-spinners';
import TextareaAutosize from 'react-textarea-autosize';
import { Form, Button, Container } from 'react-bootstrap';

import { AddCourseAttachment } from '../../../../../../services/course-service';
import { showAxiosResponseErrors } from '../../../../../../services/error-handler-service';
import { success } from '../../../../../../services/notification-service';

import { updateCourse } from '../../../../../../store/course/actions';
import { CourseState } from '../../../../../../store/course/types';
import { SystemState } from '../../../../../../store/system/types';

import { Attachment } from '../../../../../../models/attachment';

type Props = {
};

export const AddAttachments = (props: Props) => {
    const dispatch = useDispatch()

    const [adding, setAdding] = useState(false);
    const courseState: CourseState = useSelector((state: any) => state.course);
    const systemState: SystemState = useSelector((state: any) => state.system);

    const initialAttachment: Attachment = {
        uid: '',
        course: courseState.id,
        title: '',
        description: '',
        link: '',
    }

    const [attachment, setAttachment] = useState(initialAttachment);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setAttachment({...attachment, [name]: value});
    };
    
    const submit = () => {
        setAdding(true);
        AddCourseAttachment(courseState.owner, courseState.code, attachment, systemState)
            .then((result: AxiosResponse) => {
                setAttachment({...attachment, uid: result.data.uid})
                dispatch(updateCourse({
                    ...courseState, attachments: [...courseState.attachments, {...attachment, uid: result.data.uid}]
                }))
                success('Attachment added successfully');
            }).catch((err: AxiosError) => {
                showAxiosResponseErrors(err)
            }).finally(() => setAdding(false));
    }

    const Schema = yup.object().shape({
        title: yup.string().required('Title is a required field').max(50, 'Ensure this field has no more than 50 characters.')
            .test('Doesn\'t contain special characters test', 'Title can\'t contain special characters', (value) => {
                return !value?.match(/[$-/:-?{-~!"^_`[\]]/);
            }),
        link: yup.string().required('Link is a required field').url('Link must be a vaild URL'),
        description: yup.string(),
    });

    const { register, handleSubmit, errors, formState } = useForm<Attachment>({
        mode: "all",
        resolver: yupResolver(Schema)
    });

    const { isValid } = formState;

    return (
        <Container>
            <div>
                <p className="f1 peam-title-1">
                    Add attachments
                </p>
                <hr />
            </div>
            <div>
                <Form className="" onSubmit={handleSubmit(() => submit())}>
                    <Form.Group controlId="title">
                        <Form.Label className="f3">Title <span className="required-text">*</span></Form.Label>
                        <Form.Control
                            className="f2"
                            type="text"
                            autoComplete="off"
                            onChange={handleChange}
                            name="title"
                            ref={register}
                        />
                        <p className="required-text"> {errors.title?.message} </p>
                    </Form.Group>
                    <Form.Group controlId="link">
                        <Form.Label className="f3">Link <span className="required-text">*</span></Form.Label>
                        <Form.Control
                            className="f2"
                            type="text"
                            autoComplete="off"
                            onChange={handleChange}
                            name="link"
                            ref={register}
                        />
                        <p className="required-text"> {errors.link?.message} </p>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label className="f3">Description <span className="required-text">*</span></Form.Label>
                        <TextareaAutosize
                            minRows={3}
                            className="form-control f3" 
                            onChange={handleChange}
                            name="description"
                            ref={register}
                        />
                        <p className="required-text"> {errors.description?.message} </p>
                    </Form.Group>
                    <Form.Group>
                        {
                            adding ? (
                                <CircleLoader size={35} color={"#1a1a1a"} loading={adding} />
                            ) : (
                                <Button type="submit" className="px-5 py-2" variant="dark" disabled={ !isValid }>
                                    Add attachment
                                </Button>
                            )
                        }
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
};