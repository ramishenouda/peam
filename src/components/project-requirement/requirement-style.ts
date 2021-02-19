import styled, { css } from 'styled-components';

import { Navbar as navbar } from 'react-bootstrap';

const header = css`
    padding: 10px 20px 0px 20px !important;
    font-family: 'Inter', 'Roboto', sans-serif;
`

export const Title = styled.h1`
    ${header}
`

export const Description = styled.h2`
    ${header}
`

export const Navbar = styled(navbar)`
    padding: 0 5vw 1.1vh 5vw;
    overflow-x: scroll;
    padding-right: 100px !important;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`
