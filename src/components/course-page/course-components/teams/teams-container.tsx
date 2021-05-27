import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { CourseState } from '../../../../store/course/types';
import { SystemState } from '../../../../store/system/types';

import { Requirement } from '../../../../models/requirement';

import { GetCourseTeams } from '../../../../services/course-service';

import { Teams as View } from './teams-view';

type Props = {
  fetch?: boolean;
  requirement?: Requirement;
};

export const Teams = (props: Props) => {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [projectRequirements, setProjectRequirements] = useState(
    Array<Requirement>()
  );
  // const [filterdStudents, setFilterdTeams] = useState(Array<team>());
  // const [searchValue, setSearchValue] = useState('');

  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);

  useEffect(() => {
    if (props.fetch) {
      GetCourseTeams(courseState.owner, courseState.code, systemState)
        .then((result) => {
          setProjectRequirements(result.data.requirements);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        })
        .finally(() => {
          setFetching(false);
        });
    } else if (props.requirement) {
      setProjectRequirements([props.requirement]);
      setFetching(false);
    } else {
      setError(true);
      setFetching(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseState.owner, courseState.code]);

  if (fetching) {
    return <div className="f1 p-5 text-center"> Loading.... </div>;
  } else if (error) {
    return <div> error </div>;
  } else if (projectRequirements) {
    const Teams = projectRequirements.map((pr: Requirement, index: number) => (
      <View
        title={pr.title}
        teams={pr.teams}
        role={courseState.role}
        key={pr.uid}
        index={index}
        hideSeparator={props.requirement !== undefined}
      />
    ));

    return <>{Teams}</>;
  }

  return <div className="mt-5 f1 text-center">No teams yet.</div>;
};
