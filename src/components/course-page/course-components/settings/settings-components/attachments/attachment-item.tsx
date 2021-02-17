import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FolderIcon from '@material-ui/icons/Folder';
import PDF from '@material-ui/icons/PictureAsPdf';

import { CircleLoader } from 'react-spinners';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from 'react-bootstrap';

import { confirm, success } from '../../../../../../services/notifications-service';
import { showAxiosResponseErrors } from '../../../../../../services/error-handler-service';
import { DeleteCourseAttachment, UpdateCourseAttachment } from '../../../../../../services/course-service';

import { Attachment } from '../../../../../../models/attachment';

import { Div, DeleteIcon, SettingsIcon, Form } from './attachment-style';

type Props = {
    data: Attachment,
    courseOwner: string,
    courseCode: string,
    showOptions: boolean,
    removeAttachment?: (id: string) => void
};

export const AttachmentItem = (props: Props) => {
    const [edit, setEdit] = useState(false);
    const [editing, setEditing] = useState(false);
    const [attachment, setAttachment] = useState(props.data);

    const Icon = props.data.link.includes('pdf') ? <PDF /> : <FolderIcon />;
    const title = attachment.title;

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setAttachment({...attachment, [name]: value});
    };

    const submit = () => {
        setEditing(!editing)
        UpdateCourseAttachment(props.courseOwner, props.courseCode, attachment)
            .then(() => {
                success('Attachment updated successfully');
            }).catch((err) => {
                showAxiosResponseErrors(err);
            }).finally(() => {
                setEditing(editing)
                setEdit(edit)
            });
    }

    const Schema = yup.object().shape({
        title: yup.string().required('Title is a required field').max(50, 'Ensure this field has no more than 50 characters.'),
        link: yup.string().required('Link is a required field').url('Link must be a vaild URL'),
        description: yup.string(),
    });

    const { register, handleSubmit, errors, formState } = useForm<Attachment>({
        mode: "all",
        resolver: yupResolver(Schema)
    });

    const { isValid } = formState;

    const deleteAttachment = () => {
        if (!props.removeAttachment)
            return;

        confirm('Are you sure?', 'You won\'t be able to restore this attachment')
            .then(() => {
                DeleteCourseAttachment(props.courseOwner, props.courseCode, props.data.uid)
                    .then(() => {
                        console.log('Todo: Show loader on the item');
                        if (props.removeAttachment)
                            props.removeAttachment(attachment.uid);
                        success('Item deleted successfully');
                    }).catch((err) => {
                        showAxiosResponseErrors(err);
                    });
            })
    }

    if (!edit) {
        return (
            <Div className="p-3 mb-2">
                <div className="float-left">
                    {Icon}
                    <a href={attachment.link} rel="noreferrer" target="_blank" className="ml-1 link">
                        {title}
                    </a> 
                </div>
                {
                    props.showOptions &&
                    <div className="float-right">
                        <SettingsIcon onClick={() => setEdit(!edit)} className="mr-2" />
                        <DeleteIcon onClick={deleteAttachment} />
                    </div>
                }
                <Div></Div>
            </Div>
        );
    }

    return (
        <Form className="p-3 mb-2" onSubmit={handleSubmit(() => submit())}>
            <Form.Group controlId="title">
                <Form.Label className="f3">Title <span className="required-text">*</span></Form.Label>
                <Form.Control
                    className="f3"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    name="title"
                    ref={register}
                    defaultValue={attachment.title}
                />
                <p className="required-text"> {errors.title?.message} </p>
            </Form.Group>
            <Form.Group controlId="link">
                <Form.Label className="f3">Link <span className="required-text">*</span></Form.Label>
                <Form.Control
                    className="f3"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    name="link"
                    ref={register}
                    defaultValue={attachment.link}
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
                    defaultValue={attachment.description}
                />
                <p className="required-text"> {errors.description?.message} </p>
            </Form.Group>
            <Form.Group>
                {
                    editing ? (
                        <CircleLoader size={35} color={"#1a1a1a"} loading={editing} />
                    ) : (
                        <div>
                            <Button type="submit" className="px-3 py-2" variant="dark" disabled={ !isValid }>
                                Update
                            </Button>
                            <Button onClick={() => setEdit(!edit)} className="ml-2 px-3 py-2" variant="dark">
                                Cancel
                            </Button>
                        </div>
                    )
                }
            </Form.Group>
        </Form>
    );
    
};
