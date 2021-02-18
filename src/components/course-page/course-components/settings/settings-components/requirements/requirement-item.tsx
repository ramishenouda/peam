import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { CircleLoader } from 'react-spinners';
import DatePicker from "react-datepicker";

import { Button } from 'react-bootstrap';

import { RequirementForCreation as Requirement } from '../../../../../../models/requirement';
import { CourseState } from '../../../../../../store/course/types';
import { updateCourse } from '../../../../../../store/course/actions';

import { Item, Title, Description, DDate, Form, FormControl, TextareaAutosize, Section } from './requirement-style';
import { UpdateRequirement } from '../../../../../../services/requirement-service';
import { showAxiosResponseErrors } from '../../../../../../services/error-handler-service';
import { success } from '../../../../../../services/notifications-service';

type Props = {
    requirement: Requirement;
    showOptions?: boolean;
};

export const RequirementItem = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);
    const disPatch = useDispatch();

    // will be used if the use canceled Editing
    let currentItemData = props.requirement;
    // to toggle editing
    const [edit, setEdit] = useState(false);
    const [editing, setEditing] = useState(false);
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
        setEditing(true);
        const requirement: Requirement = {
            uid: editItem.uid,
            course: courseState.id,
            title: editItem.title,
            description: editItem.description,
            from_dt: startDate,
            to_dt: endDate
        }

        UpdateRequirement(courseState.owner, courseState.code, requirement, currentItemData.title)
            .then(() => {
                success('Requirement updated successfully')
                const requirementIndex = courseState.requirements.findIndex(item => item.uid === requirement.uid);
                const requirements = courseState.requirements;

                if(requirementIndex > -1) {
                    requirements[requirementIndex] = requirement;
                    disPatch(updateCourse({
                        ...courseState, requirements: [...requirements]
                    }))
                }

                setEditItem({...editItem, 'to_dt': new Date(endDate), 'from_dt': new Date(startDate)})
                setEdit(false);
                currentItemData = editItem;
            }).catch((err) => {
                showAxiosResponseErrors(err);
            }).finally(() => {
                setEditing(false)
            });
    }

    const ViewItem = () => {
        if(edit)
        return <></>

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
                    <Description className="f3">
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
                            <Button className="ml-2" variant="dark" onClick={() => setEdit(true)}>
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
        const Schema = yup.object().shape({
            title: yup.string().required('Title is a required field').max(50)
                .test('Doesn\'t contain special characters test', 'Username can\'t contain special characters', (value) => {
                    return !value?.match(/[$-/:-?{-~!"^_`[\]]/);
                }),
            description: yup.string().max(300)
        });

        const { register , handleSubmit, errors, formState } = useForm<Requirement>({
            mode: "all",
            resolver: yupResolver(Schema)
        });

        const { isValid } = formState;

        if(!edit) {
            return <></>
        }

        return (
            <Form onSubmit={handleSubmit(saveChanges)}>
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
                <Form.Group>
                    <FormControl
                        defaultValue={editItem.title}
                        className="f2"
                        autoFocus={true}
                        autoComplete="off"
                        name="title"
                        type="text"
                        onChange={handleChange}
                        ref={register}
                    />
                    <p className="required-text"> {errors.title && errors.title.message} </p>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="f3">Description <span className="required-text">*</span></Form.Label>
                    <TextareaAutosize
                        style={{width: '100%'}}
                        minRows={3}
                        defaultValue={editItem.description}
                        className="form-control f3"
                        onChange={handleChange}
                        name="description"
                        ref={register}
                    />
                    <p className="required-text"> {errors.description?.message} </p>
                </Form.Group>
                <Form.Group>
                {
                    editing ? (
                        <CircleLoader size={35} color={"#1a1a1a"} loading={editing} />
                    ) : (
                        <div className="requirement-item-options">
                            <Button variant="dark" onClick={cancelEditing}>
                                Cancel editing
                            </Button>
                            <Button className="ml-2" variant="success" disabled={ !isValid } onClick={saveChanges}>
                                Save changes
                            </Button>
                        </div>
                    )
                }
                </Form.Group>
            </Form>
        )
    }

    return (
        <div>
            { EditItem() }
            { ViewItem() }
        </div>
    );
};
