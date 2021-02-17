import styled from 'styled-components';

export const Div = styled.div`
    background: #fafafa;
    padding: 10px;
    border-radius: 10px;
`

export const Item = styled.div`
    border-radius: 5px;
    padding: 10px;
    background:  #f1f1f1;
    color: #1a1a1a !important;
    position: relative;
    transition: 0.5s;
`

const style = `
    padding: 5px 10px;
    border-radius: inherit;
`

export const Title = styled.h1`
    ${style}
    background-color: rgb(48, 48, 48);
    color: #fff;
    font-family: 'Roboto';
    font-weight: 300;
    border-radius: 5px;
    height: fit-content;
    box-shadow: none;
`

export const Description = styled.p`
    ${style}
    box-shadow: none;
    border-radius: 5px;
    overflow-y: hidden;
    outline: none;
    background: rgba(0, 0, 0, 0.075)
`
