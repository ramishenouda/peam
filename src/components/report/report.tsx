import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import { peamPlagiarism } from 'services/plagiarism-service';

import { Team } from 'models/team';

import { Title } from 'style';
import { HashLoader as LoaderComponent } from 'react-spinners';

type Props = {
  team: Team;
  token: string;
  peamButton: boolean;
  peamButtonText: string;
};

const Report = ({ team, token, peamButton, peamButtonText }: Props) => {
  const [fetchingData, setFetchingData] = useState(false);

  const runPeam = () => {
    setFetchingData(true);
    peamPlagiarism(team.project.uid, token)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setFetchingData(false));
  };

  if (fetchingData) {
    return Loader(fetchingData);
  }

  if (peamButton) {
    return <Button onClick={runPeam}>{peamButtonText}</Button>;
  }

  return (
    <Container>
      <header>
        <Title className="f1">Report page.</Title>
        <p className="f3">
          Here you can run peam plagiarism, to detect the plagiarism for a
          project over all the requirement projects.
        </p>
      </header>
      <div>
        <Button variant="dark" onClick={runPeam}>
          Run peam plagiarism!
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
