import styled, { css } from 'styled-components';

import { Container as container, Navbar as navbar } from 'react-bootstrap';

export const Container = styled(container)`
    font-family: 'Roboto', sans-serif;
`

export const Navbar = styled(navbar)`
    padding: 0 5vw 1.1vh 5vw;
    padding-right: 100px !important;
    overflow-x: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
`

export const NavItem = styled.div`
    font-family: Inconsolata;
    text-decoration: none #fff;
    color: #1a1a1a !important;
    font-size: x-large;
    text-underline-offset: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out !important;
    display: inline-flex !important;

    :hover {
        text-decoration: underline #1a1a1a;
    }
`

const style = css`
    font-family: 'Inter', sans-serif;
`

export const Title = styled.div`
    ${style}
    padding-top: 10px;
`

export const Description = styled.div`
    ${style}
    padding-bottom: 10px;
`
