import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

import { ProjectRequirement } from '../../../../../../../models/project-requirement';

import './add-project-requirement-style.css'

type Props = {
    add: (pr: ProjectRequirement) => void;
}

function AddProjectRequirement(props: Props): JSX.Element {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [attachements, setAttachements] = useState('');

    const AddProjectRequirementSchema = yup.object().shape({
        title: yup.string().required('Title is a required field'),
        description: yup.string().required('Description is a required field'),
    });

    const { register , handleSubmit, errors } = useForm<ProjectRequirement>({
        mode: "all",
        resolver: yupResolver(AddProjectRequirementSchema)
    });

    const submit = () => {
        const pr: ProjectRequirement = {
            uid: '',
            title: title,
            description: description,
            from_dt: startDate,
            to_dt: endDate
        };
        props.add(pr);
    }

    return (
        <div id="add-project-requirement" className="center-big-wide-small mb-2 mt-3 px-3">
            <p className="f3">
                A project requirement is where the students can submit their projects.
                it also contains information like the start date of submitting the projects, end date, and other information that could be added in the description. 
            </p>
            <div className="mt-4">
                <h1 className="f1 title">
                    Add a project requirement
                </h1>
                <hr />
            </div>
            <div className="mt-2">
                <Form className="" onSubmit={handleSubmit(() => submit())}>
                    <Form.Group>
                        <span className="f3">
                            Start date: &nbsp;
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
                            End date: &nbsp;&nbsp;
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
                            className="project-req-title f2"
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
                            rows={10}
                            className="form-control f3" 
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            ref={register}
                        />
                        <p className="required-text"> {errors.description?.message} </p>
                    </Form.Group>
                    <Form.Group controlId="dropzone">
                        <Form.Label className="f3">Add attachements </Form.Label>
                    </Form.Group>
                    <Form.Group className="project-requirement-item-options">
                        <Button type="submit" className="px-5 py-2" variant="dark">Add</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default AddProjectRequirement;
