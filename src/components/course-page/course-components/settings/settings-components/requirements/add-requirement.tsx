import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import { CircleLoader } from 'react-spinners';
import { Form, Button, Container } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

import { RequirementForCreation as Requirement } from '../../../../../../models/requirement';

import { CreateRequirement } from '../../../../../../services/requirement-service';
import { showAxiosResponseErrors } from '../../../../../../services/error-handler-service';
import { success } from '../../../../../../services/notification-service';

import { CourseState } from '../../../../../../store/course/types';
import { updateCourse } from '../../../../../../store/course/actions';


import './add-requirement-style.css'

export const AddRequirement = () => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const disPatch = useDispatch();

    const [adding, setAdding] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const Schema = yup.object().shape({
        title: yup.string().required('Title is a required field').max(50)
            .test('Doesn\'t contain special characters test', 'Title can\'t contain special characters', (value) => {
                return !value?.match(/[$-/:-?{-~!"^_`[\]]/);
            }),
        description: yup.string().max(300),
    });

    const { register , handleSubmit, errors, formState } = useForm<Requirement>({
        mode: "all",
        resolver: yupResolver(Schema)
    });

    const { isValid } = formState;

    const submit = () => {
        setAdding(true);
        const requirement: Requirement = {
            uid: '',
            course: courseState.id,
            title: title,
            description: description,
            from_dt: startDate,
            to_dt: endDate
        };

        CreateRequirement(courseState.owner, courseState.code, requirement)
            .then((result) => {
                const requirement: Requirement = result.data;

                success('Requirement created successfully')
                disPatch(updateCourse({
                    ...courseState, requirements: [...courseState.requirements, requirement]
                }))
            }).catch((err) => {
                showAxiosResponseErrors(err)
            }).finally(() => setAdding(false));
    }

    return (
        <Container>
            <div>
                <h1 className="f2 mb-4">
                    Project requirement
                </h1>
                <p className="f3">
                    A project requirement is where the students can submit their projects.
                    it also contains information like the start date of submitting the projects, end date, and other information that could be added in the description. 
                </p>
            </div>
            <div className="mt-4">
                <h1 className="f2 title">
                    Add a project requirement
                </h1>
                <hr />
            </div>
            <div className="mt-2">
                <Form onSubmit={handleSubmit(() => submit())}>
                    <Form.Group>
                        <span className="f3">
                            Form: &nbsp;
                        </span>
                        <DatePicker
                            showTimeSelect
                            onChange={(date: Date) => setStartDate(date)} 
                            selected={startDate}
                            className="form-control"
                            dateFormat="Pp"
                        />
                        <p className="required-text"> {errors.from_dt?.message} </p>
                    </Form.Group>
                    <Form.Group>
                        <span className="f3">
                            To: &nbsp;&nbsp;
                        </span>
                        <DatePicker
                            showTimeSelect
                            onChange={(date: Date) => setEndDate(date)} 
                            selected={endDate}
                            className="form-control"
                            dateFormat="Pp"
                        />
                        <p className="required-text"> {errors.to_dt?.message} </p>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label className="f3">Title <span className="required-text">*</span></Form.Label>
                        <Form.Control 
                            className="f2"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            ref={register}
                        />
                        <p className="required-text"> {errors.title?.message} </p>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label className="f3">Description <span className="required-text">*</span></Form.Label>
                        <TextareaAutosize
                            style={{width: '100%'}}
                            minRows={3}
                            className="form-control f3" 
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            ref={register}
                        />
                        <p className="required-text"> {errors.description?.message} </p>
                    </Form.Group>
                    <Form.Group className="project-requirement-item-options">
                        {
                            adding ? (
                                <CircleLoader size={35} color={"#1a1a1a"} loading={adding} />
                            ) : (
                                <Button type="submit" className="px-5 py-2" variant="dark" disabled={ !isValid }>
                                    Add requirement
                                </Button>
                            )
                        }
                    </Form.Group>
                </Form>
            </div>
        </Container>
    )
}
