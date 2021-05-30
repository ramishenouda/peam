import React, { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

import { Button, Container } from 'react-bootstrap';
import { HashLoader as LoaderComponent } from 'react-spinners';

import { peamPlagiarism } from 'services/plagiarism-service';
import { showAxiosResponseErrors } from 'services/error-handler-service';

import { Team } from 'models/team';
import { Plagiarism as plagiarism } from 'models';

import { Plagiarism } from 'components/plagiarism';

import { Title } from 'style';

type Props = {
  team: Team;
  token: string;
  peamButton: boolean;
  peamButtonText: string;
};

const Report = ({ team, token, peamButton, peamButtonText }: Props) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [plagiarismData, setPlagiarismData] = useState({} as plagiarism);

  const runPeam = () => {
    setFetchingData(true);
    peamPlagiarism(team.project.uid, token)
      .then((result: AxiosResponse) => {
        setPlagiarismData(result.data);
      })
      .catch((err: AxiosError) => {
        showAxiosResponseErrors(err);
      })
      .finally(() => setFetchingData(false));
  };

  if (!team.project) {
    return (
      <div className="text-center mt-5 f1 font-roboto">
        <p>The team didn't upload any projects yet.</p>
        <p>The page will be availabe once the team uploads their project.</p>
      </div>
    );
  }

  if (fetchingData) {
    return Loader(fetchingData);
  }

  if (plagiarismData.files) {
    return (
      <Plagiarism
        projectUid={team.project.uid}
        plagiarismData={plagiarismData.files}
        ratio={plagiarismData.ratio}
      />
    );
  }

  if (peamButton) {
    return <Button onClick={runPeam}>{peamButtonText}</Button>;
  }

  // todo: remove this shit.

  return (
    <Container className="text-center pt-5">
      <header>
        <Title className="f1">Report page.</Title>
        <p className="f3">
          Here you can run peam plagiarism, to detect the plagiarism for a
          project over all the requirement projects.
        </p>
      </header>
      <div>
        <Button variant="dark" onClick={runPeam}>
          Detect plagiarism!
        </Button>
      </div>
    </Container>
  );
};

const Loader = (fetching: boolean) => {
  return (
    <div className="text-center f1 font-roboto mt-5">
      <p>Please wait!</p>
      <p>We are using dark magic to detect plagiarism</p>
      <div className="d-flex justify-content-center">
        <LoaderComponent loading={fetching} />
      </div>
    </div>
  );
};

Report.defaultProps = {
  peamButton: false,
  peamButtonText: 'Run peam plagiarism!',
};

export default Report;
