import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CourseState } from '../../../../store/course/types';
import { SystemState } from '../../../../store/system/types';

import { StudentForCourseList as student } from '../../../../models/student';
import { GetCourseStudents } from '../../../../services/course-service';

import { confirm, success } from '../../../../services/notification-service';
import { DeleteCourseStudent } from '../../../../services/course-service';

import { Students as View } from './students-view';
import { showAxiosResponseErrors } from '../../../../services/error-handler-service';

export const Students = () => {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [students, setStudents] = useState(Array<student>());
  const [filterdStudents, setFilterdStudents] = useState(Array<student>());
  const [searchValue, setSearchValue] = useState('');

  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);

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

      DeleteCourseStudent(
        courseState.owner,
        courseState.code,
        username,
        systemState
      )
        .then((result) => {
          success('Student was removed successfully');
          setStudents((prevState) =>
            prevState.filter((x) => x.username !== username)
          );
        })
        .catch((err) => {
          showAxiosResponseErrors(err);
        });
    });
  };

  useEffect(() => {
    let canUnload = false;
    setTimeout(() => {
      canUnload = true;
    }, 500);

    GetCourseStudents(courseState.owner, courseState.code, systemState)
      .then((result) => {
        setStudents(result.data.students);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        if (canUnload === true) setFetching(false);
        else {
          setTimeout(() => {
            setFetching(false);
          }, 500);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);

    if (searchValue === '') {
      setFilterdStudents([]);
      return;
    }

    const filterdStudents = students.filter((student) => {
      if (!student.name) student.name = '';

      return (
        searchValue.trimStart().toLowerCase() ===
        (student.name.slice(0, searchValue.length).toLowerCase().trim() ||
          student.username.slice(0, searchValue.length).toLowerCase().trim())
      );
    });

    setFilterdStudents(filterdStudents);
  };

  if (fetching) {
    return <div className="text-center f1 mt-5"> Loading... </div>;
  } else if (error) {
    return (
      <div className="text-center f1 mt-5">
        {' '}
        Error while loading the students.{' '}
      </div>
    );
  } else {
    return (
      <View
        searchStudents={searchStudents}
        students={students}
        filteredStudents={filterdStudents}
        searchValue={searchValue}
        role={courseState.role}
        remove={remove}
      />
    );
  }
};
