import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DeleteTeam } from 'services/team-servce';
import { showAxiosResponseErrors } from 'services/error-handler-service';
import { confirmText, error, success } from 'services/notification-service';

import { CourseState } from 'store/course/types';
import { SystemState } from 'store/system/types';
import { Section } from 'style';
import { useParams } from 'react-router-dom';

type Props = {};

interface Params {
  code: string;
  owner: string;
  type: string;
  title_1: string;
  title_2: string;
}

export const Dangerous = (props: Props) => {
  const params: Params = useParams();

  const courseState: CourseState = useSelector((state: any) => state.course);
  const systemState: SystemState = useSelector((state: any) => state.system);

  const requirementLink = `${courseState.owner}/${courseState.code}/requirements/${params.title_1}`;
  const removeCourse = () => {
    confirmText(
      "You can't revert this",
      `This will delete everything.
                </br>type the course title to confirm: </br> <strong> ${params.title_2} </strong>`,
      'Course title',
      courseState.title
    ).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      const value: string = result.value;
      if (value !== params.title_2) {
        error('Wrong title', 'Deleting has been canceled.');
        return;
      }

      DeleteTeam(
        courseState.owner,
        courseState.code,
        params.title_1,
        systemState,
        params.title_2
      )
        .then(() => {
          success('Team deleted successfully');
          setTimeout(() => {
            window.location.replace(`/${requirementLink}`);
          }, 500);
        })
        .catch((err) => {
          showAxiosResponseErrors(err);
        });
    });
  };

  return (
    <Section id="invite-teachers peam-title-1">
      <div>
        <Button
          variant="danger"
          onClick={removeCourse}
          className="my-2 px-5 py-2"
        >
          Remove the team
        </Button>
      </div>
    </Section>
  );
};
