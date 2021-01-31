import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

import { DropZone } from '../../dropzone/react-dropzone';

import './add-project-requirement-style.css'

interface Props {
}

function AddProjectRequirement(props: Props): JSX.Element {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
                <Form className="">
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
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label className="f3">Title <span className="required-text">*</span></Form.Label>
                        <Form.Control 
                            className="project-req-title f2"
                            autoFocus={true}
                            name="title" 
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label className="f3">Description <span className="required-text">*</span></Form.Label>
                        <TextareaAutosize
                            style={{width: '100%'}}
                            rows={10}
                            className="form-control f3" 
                            name="description"
                        />
                    </Form.Group>
                    <Form.Group controlId="dropzone">
                        <Form.Label className="f3">Add attachements </Form.Label>
                        <DropZone />
                    </Form.Group>
                    <div className="project-requirement-item-options">
                        <Button className="px-5 py-2" variant="dark">Add</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddProjectRequirement;
