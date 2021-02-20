import styled from 'styled-components';
import { Button, Container } from 'react-bootstrap';

export const CrossLine = styled.div`
    border-bottom: 1px solid #000;
    border-radius: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60vw;
    z-index: -1;
`

export const ProjectRequirementTitle = styled.div`
    font-family: Inconsolata;
    text-align: center;
    width: 85%;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    z-index: 1;

    span {
        z-index: 3;
        border-radius: 50px;
        padding: 0 5px;
    }
`;

export const Title = styled.span`
    text-overflow: ellipsis;
`

export const TeamsContainer = styled(Container)`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 10px;

    @media only screen and (max-width: 768px) {
        grid-template-columns: 100%;
    }
`

export const StyledDiv = styled.div`
    background-color: rgba(0, 0, 0, 0.075);
    color: #1a1a1a;
    font-family: 'Roboto';
    box-shadow: 1px 1px 3px black;
    border-radius: 5px;
    position: relative;
`

export const StyledImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100px;
`

export const StyledButton = styled(Button)`
    margin-left: auto;
    position: absolute;
    bottom: 13px;
    right: 13px;
`
