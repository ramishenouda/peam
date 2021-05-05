import styled from 'styled-components';

import deleteIcon from '@material-ui/icons/Delete';


import { Container as container } from 'react-bootstrap';

interface Props {
    color?: string;
    left?: string;
    right?: string;
};

export const GridView = styled.div`
    display: grid;
    padding: 20px;
    grid-template-columns: 70% 25%;
    grid-column-gap: 40px;

    @media only screen and (max-width: 768px) {
        display: block;
        text-align: center;
    }
`

export const Section = styled.section`
    background: #f9f9f9;
    padding: 10px;
    margin-bottom: auto;
    border-radius: 5px;
`

export const VerticalGridView = styled(container)`
    display: grid;
    grid-template-columns: 23% 77%;
    grid-column-gap: 20px;
    border-radius: 5px;
    padding: 10px;


    @media only screen and (max-width: 801px) {
        display: block;
    }
`

export const Title = styled.h1`
    font-family: 'Inter', 'Roboto', 'sans-serif', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
`

export const Description = styled.h6`
    font-family: 'Roboto', 'sans-serif';
    white-space: pre-wrap;
`

export const Div = styled.div`
    clear: both;
    background: #f0f0f0;
    border-radius: 5px;
    transition: 0.5s;

    :hover {
        background: #e3e3e3;
    }

    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;

    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
    position: relative;
`

export const DeleteIcon = styled(deleteIcon)`
    cursor: pointer;
    color: #ca3623;
    :hover {
        color: #ff1111;
    }
`

export const VerticalCenterdElement = styled.div`
    position: absolute;
    left:${(props: Props) => props.left ? props.left : "initial"};
    right:${(props: Props) => props.right ? props.right : "initial"};
    top: 50%;
    transform: translateY(-50%) !important;
    min-width: fit-content;
`