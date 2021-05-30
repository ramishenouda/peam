import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from 'react-bootstrap';

import {
  success,
  confirm,
} from '../../../../../../services/notification-service';
import {
  DeleteCourseTeacher,
  GetCourseTeachers,
} from '../../../../../../services/course-service';
import { showAxiosResponseErrors } from '../../../../../../services/error-handler-service';

import defaultAvatar from '../../../../../../assets/teacher-avatar.png';

import { CourseState } from '../../../../../../store/course/types';
import { SystemState } from '../../../../../../store/system/types';
import { Teacher } from '../../../../../../models/teacher';
import { Link } from 'react-router-dom';

import { Img, Div } from './style';
import { Title } from '../../../../../settings/settings-style';

type Props = {};

interface ResponseType {
  course: string;
  teacher: Teacher;
}

export const TeachersControler = (props: Props) => {
  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [teachers, setTeachers] = useState(Array<ResponseType>());

  useEffect(() => {
    GetCourseTeachers(courseState.owner, courseState.code, systemState)
      .then((result) => {
        setTeachers(result.data.teachers);
      })
      .catch((err) => {
        showAxiosResponseErrors(err);
        setError(true);
      })
      .finally(() => setFetching(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remove = (username: string, name: string) => {
    confirm(
      '',
      `Are you sure you want to remove </br> <strong> 
            ${name ? name : username} </strong> 
            </br> he will be removed from any team he is in.`
    ).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      DeleteCourseTeacher(
        courseState.owner,
        courseState.code,
        username,
        systemState
      )
        .then((result) => {
          success('Student was removed successfully');
          setTeachers((prevState) =>
            prevState.filter((x) => x.teacher.username !== username)
          );
        })
        .catch((err) => {
          showAxiosResponseErrors(err);
        });
    });
  };

  if (fetching) {
    return <div className="text-center f1 mt-5">Loading ....</div>;
  } else if (error) {
    return (
      <div className="text-center f1 mt-5">
        Error while loading teachers....
      </div>
    );
  } else {
    const data = teachers.map((x) => {
      const teacher = x.teacher;
      return (
        <div>
          <Div className=" p-3 my-4">
            <div className="float-left">
              <Link className="link" to={`/${teacher.username}`}>
                <Img
                  className="profile-pic"
                  src={`${teacher.avatar ? teacher.avatar : defaultAvatar}`}
                  alt={teacher.name ? teacher.name : teacher.username}
                />
                <span className="title link f3 p-2">
                  {teacher.name ? teacher.name : teacher.username}
                </span>
              </Link>
            </div>
            <div className="remove-btn float-right">
              {systemState.username === courseState.owner &&
                systemState.username !== teacher.username && (
                  <Button
                    variant="danger"
                    onClick={() => remove(teacher.username, teacher.name)}
                  >
                    Remove
                  </Button>
                )}
            </div>
            <Div></Div>
          </Div>
        </div>
      );
    });
    return (
      <div className="text-center f1 mt-2">
        <hr />
        <Title className="text-left f1">Manage current teachers</Title>
        {data}
      </div>
    );
  }
};
