import React from 'react';
import { Button } from 'react-bootstrap'

interface Props {
    name: string;
}

function Home(props: Props): JSX.Element {
    return (
        <Button data-testid="peam button"> {props.name} </Button>
    )
}

export default Home;
