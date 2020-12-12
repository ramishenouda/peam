import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
    name: string | null;
}

function Home(props: Props): JSX.Element {
    return (
        <Button variant="primary"> {props.name} </Button>
    )
}

export default Home;
