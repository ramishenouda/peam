import React from 'react';
import { Button, Container } from 'react-bootstrap';

import { peamPlagiarism } from 'services/plagiarism-service';

import { Team } from 'models/team';

import { Title } from 'style';

type Props = {
  team: Team;
  token: string;
  peamButton: boolean;
  peamButtonText: string;
};

const Report = ({ team, token, peamButton, peamButtonText }: Props) => {
  const runPeam = () => {
    peamPlagiarism(team.project.uid, token)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (peamButton) {
    return <Button onClick={runPeam}>{peamButtonText}</Button>;
  }

  return (
    <Container>
      <header>
        <Title className="f1">Report page.</Title>
        <p className="f3">
          Here you can run peam plagiarism, to detect the plagiarism over all
          the requirement projects.
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

Report.defaultProps = {
  peamButton: false,
  peamButtonText: 'Run peam plagiarism!',
};

export default Report;
