import styled from 'styled-components';

import { Container as container, Navbar as navbar } from 'react-bootstrap';

export const Container = styled(container)`
`

export const Section = styled.section`
    background: #fcfcfc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 2px 1px 3px #1a1a1a;
`

export const Navbar = styled(navbar)`
    overflow-x: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    display: block;
    border-radius: 5px;
    height: fit-content;
    border: 0.1em solid gray;


    ::-webkit-scrollbar {
        display: none;
    }
`

export const Separator = styled.div`
    border-width: 1px; 
    border-color: #949494;
    border-style: solid;
`

export const NavItem = styled.div`
    font-family: Inconsolata;
    text-decoration: none #fff;
    color: #1a1a1a;
    font-size: x-large;
    text-underline-offset: 13px;
    cursor: pointer;
    transition: all 0.3s ease-in-out !important;
    border-radius: 5px;
    :hover {
        background: gray;
        color: white;
    }
`
