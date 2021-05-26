import React from 'react';
import { Button, Container } from 'react-bootstrap';

import { peamPlagiarism } from 'services/plagiarism-service';

import { Team } from 'models/team';

import { Title } from 'style';

type Props = {
  team: Team;
  token: string;
  showHeader: boolean;
  showHeaderText: boolean;
};

const Report = ({ team, token, showHeader, showHeaderText }: Props) => {
  const runPeam = () => {
    peamPlagiarism(team.project.uid, token)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      {showHeader && (
        <header>
          {showHeaderText && (
            <p className="f3">Here you can check the plagiarism. </p>
          )}
          <Title>{team.name}</Title>
        </header>
      )}
      <div>
        <Button onClick={runPeam}>Run peam plagiarism!</Button>
      </div>
    </Container>
  );
};

Report.defaultProps = {
  showHeader: false,
  showHeaderText: false,
};

export default Report;
