import React, { useState, ChangeEvent } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import DatePicker from "react-datepicker";

import { Button, Form } from 'react-bootstrap';

import ProjectRequirement from '../../models/project-requirement';

type Props = {
    projectReq: ProjectRequirement
    teacher: boolean
};

export const ProjectRequirementItem = (props: Props) => {
    // will be used if the use canceled Editing
    let currentItemData = props.projectReq;
    // to toggle editing
    const [edit, setEdit] = useState(false);
    // to store the date for react-datepicker
    const [endDate, setEndDate] = useState(new Date(props.projectReq.to_dt));
    const [startDate, setStartDate] = useState(new Date(props.projectReq.from_dt));
    // to store the edited fields.
    const [editItem, setEditItem] = useState(props.projectReq);

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setEditItem({...editItem, [name]: value});
    };

    const cancelEditing = () => {
        setEndDate(new Date(currentItemData.to_dt))
        setStartDate(new Date(currentItemData.from_dt))
        setEditItem(currentItemData);
        setEdit(false);
    }

    const saveChanges = () => {
        // call the api and show loading
        setEditItem({...editItem, 'to_dt': new Date(endDate), 'from_dt': new Date(startDate)})
        currentItemData = editItem;
        setEdit(false);
    }

    const ViewItem = () => {
        const endDate = new Date(editItem.to_dt);
        const startDate = new Date(editItem.from_dt);

        let endDateStatus = '';
        let showStartDate = true;

        const dayEarlierDate = new Date(endDate);
        
        dayEarlierDate.setHours(dayEarlierDate.getHours() - 24);
        if (dayEarlierDate < new Date())
            endDateStatus = 'ShowHours';

        if (endDate < new Date())
            endDateStatus = 'GameOver';

        if (startDate < new Date())
            showStartDate = false;

        return (
            <div className="project-req-item text-light">
                <div className="project-req-deadline mb-2">
                    {
                        showStartDate &&
                        <span className={`project-req-deadline`}>
                            From: {startDate.toLocaleDateString()}
                        </span>
                    }
                    <span className={`pl-2`}>
                        {
                            showStartDate ? 'To:' : 'Deadline:'
                        }
                        &nbsp;
                        {!endDateStatus && endDate.toLocaleString()}
                        {endDateStatus === 'ShowHours' && endDate.toLocaleTimeString()}
                        {endDateStatus === 'GameOver' && <span className="date-over"> { endDate.toLocaleString() }</span>}
                    </span>
                </div>
                <h1 className="project-req-title f1">
                    { editItem.title }
                </h1>
                <p className="project-req-description f3">
                    { editItem.description }
                </p>
                <div className="project-requirement-item-options">
                <Button variant="dark">More info</Button>
                    { props.teacher && (
                        <Button className="ml-2" variant="danger" onClick={() => setEdit(true)}>
                            Edit info
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    const EditItem = () => 
    {
        console.log(startDate, endDate)
        return (
            <Form className="project-req-item text-light">
                <Form.Group>
                    <span className={`project-req-deadline`}>
                        From: &nbsp;
                        <DatePicker
                            showTimeSelect
                            onChange={(date: Date) => setStartDate(date)} 
                            selected={startDate}
                        />
                    </span>
                    <span className={`pl-2 project-req-deadline`}>
                        To: &nbsp;
                        <DatePicker
                            showTimeSelect
                            onChange={(date: Date) => setEndDate(date)} 
                            selected={endDate}
                        />
                    </span>
                </Form.Group>
                <Form.Group controlId="title">
                    <Form.Control 
                        value={editItem.title} 
                        className="project-req-title f2"
                        autoFocus={true} 
                        name="title" 
                        type="text"
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <TextareaAutosize 
                        style={{width: '100%'}} 
                        rows={4} 
                        className="project-req-description f3" 
                        defaultValue={editItem.description} 
                        name="description"
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className="project-requirement-item-options">
                    <Button variant="dark" onClick={cancelEditing}>Cancel editing</Button>
                    { props.teacher && (
                        <Button className="ml-2" variant="success" onClick={saveChanges}>
                            Save changes
                        </Button>
                    )}
                </div>
            </Form>
        )
    }

    return (
        <div>
            {edit ? EditItem() : ViewItem()}
        </div>
    );
};
