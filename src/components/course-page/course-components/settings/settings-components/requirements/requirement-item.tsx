import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DatePicker from "react-datepicker";

import { Button } from 'react-bootstrap';

import { Requirement } from '../../../../../../models/requirement';
import { CourseState } from '../../../../../../store/course/types';

import { Item, Title, Description, DDate, Form, FormControl, TextareaAutosize, Section } from './requirement-style';

type Props = {
    requirement: Requirement;
    showOptions?: boolean;
};

export const RequirementItem = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);

    // will be used if the use canceled Editing
    let currentItemData = props.requirement;
    // to toggle editing
    const [edit, setEdit] = useState(false);
    // to store the date for react-datepicker
    const [endDate, setEndDate] = useState(new Date(props.requirement.to_dt));
    const [startDate, setStartDate] = useState(new Date(props.requirement.from_dt));
    // to store the edited fields.
    const [editItem, setEditItem] = useState(props.requirement);

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
            <>
            <Item className="text-light">
                <Link to={'/' + courseState.owner + '/' + courseState.code + '/requirement/' + editItem.title} className="link">
                    <Title className="f1">
                        { editItem.title }
                    </Title>
                </Link>
                <Section>
                    <Description className="f2">
                        { editItem.description }
                    </Description>
                    <DDate className="mb-2 f4">
                        {
                            showStartDate &&
                            <span className={`requirement-deadline`}>
                                From: {startDate.toLocaleDateString()}
                            </span>
                        }
                        <span className={`${showStartDate ? 'pl-2' : ''}`}>
                            {
                                showStartDate ? 'To:' : 'Deadline:'
                            }
                            &nbsp;
                            {!endDateStatus && endDate.toLocaleString()}
                            {endDateStatus === 'ShowHours' && endDate.toLocaleTimeString()}
                            {endDateStatus === 'GameOver' && <span className="date-over"> { endDate.toLocaleString() }</span>}
                        </span>
                    </DDate>
                    {
                        props.showOptions === true &&
                        <div className="requirement-item-options">
                            <Button className="ml-2" variant="danger" onClick={() => setEdit(true)}>
                                Edit info
                            </Button>
                        </div>
                    }
                </Section>
            </Item>
            </>
        );
    }

    const EditItem = () => 
    {
        return (
            <Form className="req-item text-light">
                <Form.Group>
                    <span className={`requirement-deadline`}>
                        From: &nbsp;
                        <DatePicker
                            showTimeSelect
                            onChange={(date: Date) => setStartDate(date)} 
                            selected={startDate}
                        />
                    </span>
                    <span className={`pl-2 requirement-deadline`}>
                        To: &nbsp;
                        <DatePicker
                            showTimeSelect
                            onChange={(date: Date) => setEndDate(date)} 
                            selected={endDate}
                        />
                    </span>
                </Form.Group>
                <Form.Group controlId="title">
                    <FormControl 
                        value={editItem.title} 
                        className="f2"
                        autoFocus={true} 
                        name="title" 
                        type="text"
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <TextareaAutosize
                        style={{width: '100%'}}
                        minRows={3}
                        className="form-control f3"
                        defaultValue={editItem.description}
                        name="description"
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className="requirement-item-options">
                    <Button variant="dark" onClick={cancelEditing}>Cancel editing</Button>
                    <Button className="ml-2" variant="success" onClick={saveChanges}>
                        Save changes
                    </Button>
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
