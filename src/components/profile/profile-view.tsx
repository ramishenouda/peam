import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  name: string;
  color: string;
}

function Profile(props: Props): JSX.Element {
  return (
      <Button>Profile</Button>
  )
}

export default Profile;
