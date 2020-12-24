import React from 'react';
import Navbar from '../navbar/navbar-container';
import './home-style.css'

interface Props {
    name: string;
}

function Home(props: Props): JSX.Element {
    return (
        <>
        <Navbar />
        <div id="home">
            PEAM
        </div>
        </>
    )
}

export default Home;
