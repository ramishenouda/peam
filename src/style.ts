import styled from 'styled-components';

export const GridView = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 70% 25%;
    grid-column-gap: 40px;

    @media only screen and (max-width: 768px) {
        display: block;
        text-align: center;
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
