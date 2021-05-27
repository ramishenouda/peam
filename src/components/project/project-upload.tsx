import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ProjectFiles } from 'components/team/team-style';
import { NavItem } from 'components/navbar/navbar-style';
import { Title } from 'components/project-requirement/requirement-style';

import { CircleLoader } from 'react-spinners';

import { Project as ProjectType } from 'models/index';
import { CourseState } from 'store/course/types';
import { SystemState } from 'store/system/types';
import { TeamState } from 'store/team/types';
import { Form } from 'react-bootstrap';
import {
  Button,
  TextareaAutosize,
} from 'components/course-new/new-course-style';
import { createProject } from 'services/project-service';
import { showAxiosResponseErrors } from 'services/error-handler-service';
import { success } from 'services/notification-service';

interface Params {
  code: string;
  owner: string;
  type: string;
  title_1: string;
  title_2: string;
}

type Props = {
  project?: ProjectType;
};

export const Project = (props: Props) => {
  // fix: show only team members the upload zone.
  // fix: disable the page buttons while loading.
  const [creatingProject, setCreatingProject] = useState(false);
  const params: Params = useParams();
  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);
  const teamState: TeamState = useSelector((state: any) => state.team);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  const Schema = yup.object().shape({
    title: yup
      .string()
      .required('Title is a required field')
      .max(50, 'Ensure this field has no more than 50 characters.'),
    description: yup.string(),
  });

  const { register, handleSubmit, errors, formState } = useForm<ProjectType>({
    mode: 'all',
    resolver: yupResolver(Schema),
  });

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ multiple: false, maxFiles: 1, accept: '.zip' });

  if (!props.project && !creatingProject)
    return Project404(props, setCreatingProject, courseState);

  let files = acceptedFiles.map((file: File) => (
    <div
      onClick={() => {
        files = [];
        acceptedFiles.pop();
        setHasFile(false);
      }}
      className="drop-zone"
      key={file.name}
    >
      {file.name} - {(file.size / 1000 / 1000).toFixed(2)} mb
      <p className="text-black f3">Click to choose another file.</p>
    </div>
  ));

  if (files.length && !hasFile) {
    setHasFile(true);
  }

  const { isValid } = formState;
  const submit = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('project_zip', acceptedFiles[0]);
    formData.append('title', title);
    formData.append('team', teamState.uid ? teamState.uid : '');
    formData.append('description', description);

    createProject(
      courseState.owner,
      courseState.code,
      params.title_1,
      params.title_2,
      systemState,
      formData
    )
      .then((result) => {
        console.log(result);
        success('Your project was created successfully');
        setTimeout(() => {
          window.location.reload();
        }, 250);
      })
      .catch((err) => {
        console.log(err);
        showAxiosResponseErrors(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form className="" onSubmit={handleSubmit(() => submit())}>
      <Form.Group controlId="title">
        <Form.Label className="f3">
          Title <span className="required-text">*</span>
        </Form.Label>
        <Form.Control
          className="f2"
          type="text"
          autoComplete="off"
          defaultValue={title}
          onChange={(e: any) => setTitle(e.target.value)}
          name="title"
          ref={register}
        />
        <p className="required-text"> {errors.title?.message} </p>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label className="f3">Description</Form.Label>
        <TextareaAutosize
          minRows={3}
          className="form-control f3"
          onChange={(e: any) => setDescription(e.target.value)}
          name="description"
          ref={register}
        />
        <p className="required-text"> {errors.description?.message} </p>
      </Form.Group>
      <Form.Group>
        {!hasFile && (
          <div className="drop-zone" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here</p>
            ) : (
              <p>Drag and drop the zip file, or click to select it.</p>
            )}
          </div>
        )}
        {hasFile && files}
      </Form.Group>
      <Form.Group>
        {loading ? (
          <CircleLoader size={35} color={'#1a1a1a'} loading={loading} />
        ) : (
          <Button
            type="submit"
            className="px-5 py-2"
            variant="dark"
            disabled={!isValid || !files.length}
          >
            Create project
          </Button>
        )}
      </Form.Group>
    </Form>
  );
};

// shows to the doctors that there is no projects.
// shows to the student a button to toggle creating their project.
const Project404 = (
  props: Props,
  toggleCreatingProject: (arg: boolean) => void,
  courseState: CourseState
) => {
  // todo: more responsive for mobile apps (seprate the students and the project files)
  return (
    <ProjectFiles>
      {!props.project && courseState.role === 'teacher' && (
        <Title className="f2 p-5 text-center">
          The team hasn't uploaded any projects yet.
        </Title>
      )}
      {!props.project && courseState.role === 'student' && (
        <NavItem
          onClick={() => toggleCreatingProject(true)}
          className="f2 p-5 text-center"
        >
          You haven't uploaded any projects yet. <br /> Click to start
          uploading.
        </NavItem>
      )}
    </ProjectFiles>
  );
};
